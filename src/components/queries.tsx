import gql from "graphql-tag";

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(input: {id: $id, clientMutationId: "wat"}) {
            todo {
                id
                status
            }
        }
    }
`;

export const TODO_LIST = gql`
    query BasicTodoList($cursorTodos: String!, $cursorDones: String!) {
        todos(first: 3, after: $cursorTodos, where: {completed: false}) {
            edges {
                node {
                    id
                    wpId: todoId
                    title
                    completed
                    status
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
        dones: todos(first: 3, after: $cursorDones, where: {completed: true}) {
            edges {
                node {
                    id
                    wpId: todoId
                    title
                    completed
                    status
                }
            }
            pageInfo {
                endCursor
                hasNextPage
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
                id
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
                id
                title
                completed
            }
        }
    }
`;
