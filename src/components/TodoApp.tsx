import React from "react";
import produce from "immer";
import uniqBy from "lodash/uniqBy";
import {Query} from "react-apollo";
import styled from "react-emotion";
import FlipMove from "react-flip-move";

import {getEdgeNodes, EdgeNodeType} from "../utils";

import {
    BasicTodoList,
    BasicTodoListVariables,
} from "./__generated__/BasicTodoList";
import {View, Title, Colors, Row, RedButton} from "./core";
import {TODO_LIST} from "./queries";
import {AddTodoInput} from "./AddTodoInput";
import {TodoItem} from "./TodoItem";

const BlackTitle = styled(Title)({
    color: Colors.black,
});

const TodoColumn = styled(View)({
    color: Colors.black,
    alignItems: "center",
    width: 350,
});

type TodoNode = EdgeNodeType<BasicTodoList, "todos">;

const TodoTracks = () => (
    <Query<BasicTodoList, BasicTodoListVariables>
        query={TODO_LIST}
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

            const cursorTodos = res.data!.todos!.pageInfo.endCursor!;
            const cursorDones = res.data!.dones!.pageInfo.endCursor!;

            const hasMore =
                res.data!.todos!.pageInfo.hasNextPage! ||
                res.data!.dones!.pageInfo.hasNextPage!;

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
                            <RedButton
                                onClick={() => {
                                    res.fetchMore({
                                        variables: {cursorTodos, cursorDones},
                                        updateQuery: (prev, next) =>
                                            produce(prev, draftPrev => {
                                                if (!next.fetchMoreResult) {
                                                    return prev;
                                                }

                                                draftPrev.todos!.edges = [
                                                    ...draftPrev!.todos!.edges!,
                                                    ...next.fetchMoreResult
                                                        .todos!.edges!,
                                                ];

                                                draftPrev.dones!.edges = [
                                                    ...draftPrev!.dones!.edges!,
                                                    ...next.fetchMoreResult
                                                        .dones!.edges!,
                                                ];

                                                draftPrev.todos!.pageInfo = next.fetchMoreResult!.todos!.pageInfo;
                                                draftPrev.dones!.pageInfo = next.fetchMoreResult!.dones!.pageInfo;

                                                if (
                                                    !draftPrev.todos!.pageInfo
                                                        .endCursor
                                                ) {
                                                    draftPrev.todos!.pageInfo.endCursor = prev.todos!.pageInfo.endCursor;
                                                }

                                                if (
                                                    !draftPrev.dones!.pageInfo
                                                        .endCursor
                                                ) {
                                                    draftPrev.dones!.pageInfo.endCursor = prev.dones!.pageInfo.endCursor;
                                                }

                                                return draftPrev;
                                            }),
                                    });
                                }}
                            >
                                More
                            </RedButton>
                        )}
                        <View style={{height: 50}} />
                    </View>
                </View>
            );
        }}
    </Query>
);

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
