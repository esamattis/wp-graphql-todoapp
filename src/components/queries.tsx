import gql from "graphql-tag";

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(input: {id: $id, clientMutationId: "wat"}) {
            todo {
                completed
            }
        }
    }
`;

export const TODO_LIST = gql`
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

export const SET_COMPLETED = gql`
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
export const ADD_TODO = gql`
    mutation AddTodo($title: String!) {
        createTodo(
            input: {
                title: $title
                clientMutationId: "lala"
                completed: false
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
`;
