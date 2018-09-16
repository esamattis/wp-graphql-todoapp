import React from "react";
import {Query} from "react-apollo";
import styled from "react-emotion";
import FlipMove from "react-flip-move";

import {getEdgeNodes} from "../utils";

import {BasicTodoList} from "./__generated__/BasicTodoList";
import {View, Title, Colors} from "./core";
import {TODO_LIST} from "./queries";
import {AddTodoInput} from "./AddTodoInput";
import {TodoItem} from "./TodoItem";

const TodoList = () => (
    <Query<BasicTodoList> query={TODO_LIST}>
        {res => {
            if (res.loading) return <p>Loading...</p>;
            if (res.error || !res.data) return <p>Error :(</p>;

            const completed = getEdgeNodes(res.data, "completed");
            const progress = getEdgeNodes(res.data, "progress");

            return (
                <div style={{display: "flex", margin: 50}}>
                    <div>
                        <Title level="2">Tekemättömät</Title>
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
                    </div>
                    <div>
                        <Title level="2">Valmiit</Title>
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
                    </div>
                </div>
            );
        }}
    </Query>
);

const MainContainer = styled(View)({
    backgroundColor: Colors.white,
});

class TodoApp extends React.Component {
    render() {
        return (
            <MainContainer>
                <Title level="1">TODO App</Title>
                <TodoList />
                <AddTodoInput />
            </MainContainer>
        );
    }
}

export default TodoApp;
