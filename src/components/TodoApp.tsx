import React from "react";
import {Query} from "react-apollo";
import styled from "react-emotion";
import FlipMove from "react-flip-move";

import {getEdgeNodes} from "../utils";

import {BasicTodoList} from "./__generated__/BasicTodoList";
import {View, Title, Colors, Row} from "./core";
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

const TodoList = () => (
    <Query<BasicTodoList> query={TODO_LIST}>
        {res => {
            if (res.loading) return <p>Loading...</p>;
            if (res.error || !res.data) return <p>Error :(</p>;

            const completed = getEdgeNodes(res.data, "completed");
            const progress = getEdgeNodes(res.data, "progress");

            return (
                <>
                    <TodoColumn>
                        <BlackTitle level="2">Todo</BlackTitle>
                        <FlipMove>
                            {progress.map(todo => (
                                <div key={todo.id}>
                                    <TodoItem
                                        id={todo.id}
                                        title={todo.title || ""}
                                        completed={todo.completed || false}
                                    />
                                </div>
                            ))}
                        </FlipMove>
                    </TodoColumn>
                    <TodoColumn>
                        <BlackTitle level="2">Done</BlackTitle>
                        <FlipMove>
                            {completed.map(todo => (
                                <div key={todo.id}>
                                    <TodoItem
                                        id={todo.id}
                                        title={todo.title || ""}
                                        completed={todo.completed || false}
                                    />
                                </div>
                            ))}
                        </FlipMove>
                    </TodoColumn>
                </>
            );
        }}
    </Query>
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
                    <TodoList />
                </Row>
            </MainContainer>
        );
    }
}

export default TodoApp;
