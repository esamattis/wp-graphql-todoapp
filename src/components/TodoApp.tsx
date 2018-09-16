import React from "react";

import FlipMove from "react-flip-move";
import styled from "react-emotion";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag";
import {getEdgeNodes} from "../utils";
import {BasicTodoList} from "./__generated__/BasicTodoList";
import {AddTodo, AddTodoVariables} from "./__generated__/AddTodo";
import {
    SetTodoCompletion,
    SetTodoCompletionVariables,
} from "./__generated__/SetTodoCompletion";
import {DeleteTodo, DeleteTodoVariables} from "./__generated__/DeleteTodo";
import {View} from "./core";

const TODO_LIST = gql`
    query BasicTodoList {
        completed: todos(where: {completed: true}) {
            edges {
                node {
                    id
                    title
                    completed
                }
            }
        }
        progress: todos(where: {completed: false}) {
            edges {
                node {
                    id
                    title
                    completed
                }
            }
        }
    }
`;

const SET_COMPLETED = gql`
    mutation SetTodoCompletion($id: ID!, $completed: Boolean!) {
        updateTodo(
            input: {id: $id, clientMutationId: "wat", completed: $completed}
        ) {
            todo {
                completed
            }
        }
    }
`;

const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(input: {id: $id, clientMutationId: "wat"}) {
            todo {
                completed
            }
        }
    }
`;

const DeleteButton = (props: {id: string}) => (
    <Mutation<DeleteTodo, DeleteTodoVariables> mutation={DELETE_TODO}>
        {(toggle, res) => (
            <div>
                <button
                    onClick={async () => {
                        const res = await toggle({
                            variables: {
                                id: props.id,
                            },
                            refetchQueries: [{query: TODO_LIST}],
                        });
                        if (res) {
                            console.log(
                                "completion mutation results",
                                res.data,
                            );
                        }
                    }}
                >
                    x
                </button>
            </div>
        )}
    </Mutation>
);

const CompleteButton = (props: {id: string; action: "complete" | "revert"}) => (
    <Mutation<SetTodoCompletion, SetTodoCompletionVariables>
        mutation={SET_COMPLETED}
    >
        {(toggle, res) => (
            <div>
                <button
                    onClick={async () => {
                        const res = await toggle({
                            variables: {
                                id: props.id,
                                completed:
                                    props.action === "complete" ? true : false,
                            },
                            refetchQueries: [{query: TODO_LIST}],
                        });
                        if (res) {
                            console.log(
                                "completion mutation results",
                                res.data,
                            );
                        }
                    }}
                >
                    {props.action === "complete"
                        ? "Merkitse tehdyksi"
                        : "Palauta"}
                </button>
            </div>
        )}
    </Mutation>
);

const TodoItemContainer = styled(View)({
    backgroundColor: "yellow",
});

const TodoItem = (props: {id: string; title: string; completed: boolean}) => (
    <TodoItemContainer>
        <h2>{props.title}</h2>
        <CompleteButton
            id={props.id}
            action={props.completed ? "revert" : "complete"}
        />
        {props.completed && <DeleteButton id={props.id} />}
    </TodoItemContainer>
);

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
                        <h1>Tekemättömät</h1>
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
                        <h1>Valmiit</h1>
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

const AddTodoInput = () => (
    <Mutation<AddTodo, AddTodoVariables>
        mutation={gql`
            mutation AddTodo($title: String!) {
                createTodo(
                    input: {
                        title: $title
                        clientMutationId: "lala"
                        status: PUBLISH
                    }
                ) {
                    clientMutationId
                    todo {
                        title
                        completed
                    }
                }
            }
        `}
    >
        {(add, res) => (
            <div>
                <button
                    onClick={async () => {
                        const res = await add({
                            variables: {title: "JS! 2"},
                            refetchQueries: [{query: TODO_LIST}],
                        });
                        if (res) {
                            console.log(
                                "mutation results",
                                res.data!.createTodo!.todo!.title,
                            );
                        }
                    }}
                >
                    add todo
                </button>
            </div>
        )}
    </Mutation>
);

class TodoApp extends React.Component {
    render() {
        return (
            <div>
                Hello react
                <TodoList />
                <AddTodoInput />
            </div>
        );
    }
}

export default TodoApp;
