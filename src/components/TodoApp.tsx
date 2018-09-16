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
});

type TodoNode = EdgeNodeType<BasicTodoList, "todos">;

const TodoTracks = () => (
    <Query<BasicTodoList, BasicTodoListVariables>
        query={TODO_LIST}
        variables={{after: ""}}
    >
        {res => {
            if (res.loading) return <p>Loading...</p>;
            if (res.error || !res.data) return <p>Error :(</p>;

            const todos = getEdgeNodes(res.data, "todos");

            const cursor = res.data!.todos!.pageInfo.endCursor!;
            const hasMore = res.data!.todos!.pageInfo.hasNextPage!;

            return (
                <View>
                    <Row>
                        <TodoList
                            title="Todo"
                            todos={todos.filter(todo => !todo.completed)}
                        />
                        <TodoList
                            title="Done"
                            todos={todos.filter(todo => todo.completed)}
                        />
                    </Row>
                    <View>
                        {hasMore && (
                            <RedButton
                                onClick={() => {
                                    res.fetchMore({
                                        variables: {after: cursor},
                                        updateQuery: (prev, next) =>
                                            produce(prev, draftPrev => {
                                                draftPrev.todos!.edges = [
                                                    ...draftPrev!.todos!.edges!.slice(),
                                                    ...next.fetchMoreResult!.todos!.edges!.slice(),
                                                ];

                                                return draftPrev;
                                            }),
                                    });
                                }}
                            >
                                More
                            </RedButton>
                        )}
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
