import React from "react";
import {Query} from "react-apollo";
import styled from "react-emotion";
import FlipMove from "react-flip-move";

import {
    concatEdgesAtKey,
    EdgeNodeType,
    getEdgeNodes,
    getPageInfo,
    notEmpty,
} from "../utils";

import {
    DualTodoList,
    DualTodoListVariables,
} from "./__generated__/DualTodoList";
import {AddTodoInput} from "./AddTodoInput";
import {Colors, RedButton, Row, Title, View} from "./core";
import {DualTodoListQuery} from "./queries";
import {TodoItem} from "./TodoItem";

const BlackTitle = styled(Title)({
    color: Colors.black,
});

const TodoColumn = styled(View)({
    color: Colors.black,
    alignItems: "center",
    width: 350,
});

const TodoTracks = () => (
    <Query<DualTodoList, DualTodoListVariables>
        query={DualTodoListQuery}
        variables={{cursorTodos: "", cursorDones: ""}}
    >
        {res => {
            if (res.loading) return <p>Loading...</p>;
            if (res.error || !res.data) return <p>Error :(</p>;

            const todos = getEdgeNodes(res.data, "todos");
            const dones = getEdgeNodes(res.data, "dones");

            const allTodos = todos
                .concat(dones)
                .filter(todo => todo.status === "publish");

            const todosPageInfo = getPageInfo(res.data, "todos");
            const donesPageInfo = getPageInfo(res.data, "dones");

            if (!donesPageInfo || !todosPageInfo) {
                throw new Error("pageinfo fail");
            }

            const hasMore =
                todosPageInfo.hasNextPage || donesPageInfo.hasNextPage;

            const fetchMore = () => {
                res.fetchMore({
                    variables: {
                        cursorTodos: todosPageInfo.endCursor || "",
                        cursorDones: donesPageInfo.endCursor || "",
                    },

                    updateQuery: (cache, next) => {
                        if (!next.fetchMoreResult) {
                            return cache;
                        }

                        let nextCache = cache;

                        nextCache = concatEdgesAtKey(
                            "todos",
                            nextCache,
                            next.fetchMoreResult,
                        );

                        nextCache = concatEdgesAtKey(
                            "dones",
                            nextCache,
                            next.fetchMoreResult,
                        );

                        return nextCache;
                    },
                });
            };

            return (
                <View>
                    <Row>
                        <TodoList
                            title="Todo"
                            todos={allTodos.filter(todo => !todo.completed)}
                        />
                        <TodoList
                            title="Done"
                            todos={allTodos.filter(todo => todo.completed)}
                        />
                    </Row>
                    <View>
                        <View style={{height: 25}} />
                        {hasMore && (
                            <RedButton onClick={fetchMore}>More</RedButton>
                        )}
                        <View style={{height: 50}} />
                    </View>
                </View>
            );
        }}
    </Query>
);

type TodoNode = EdgeNodeType<DualTodoList, "todos">;

const TodoList = (props: {title: string; todos: TodoNode[]}) => (
    <TodoColumn>
        <BlackTitle level="2">{props.title}</BlackTitle>
        <FlipMove>
            {props.todos.map(todo => (
                <div key={todo.wpId}>
                    <TodoItem
                        id={todo.id}
                        wpId={todo.wpId}
                        title={todo.title || ""}
                        completed={todo.completed || false}
                        tags={getEdgeNodes(todo, "tags")
                            .map(tag => tag.name)
                            .filter(notEmpty)}
                    />
                </div>
            ))}
        </FlipMove>
    </TodoColumn>
);

const MainContainer = styled(View)({
    paddingTop: 20,
    backgroundColor: Colors.white,
    alignItems: "center",
});

class TodoApp extends React.Component {
    render() {
        return (
            <MainContainer>
                <BlackTitle level="1">WP GraphQL Todo App</BlackTitle>
                <View style={{height: 50}} />
                <AddTodoInput />
                <View style={{height: 50}} />
                <Row>
                    <TodoTracks />
                </Row>
            </MainContainer>
        );
    }
}

export default TodoApp;
