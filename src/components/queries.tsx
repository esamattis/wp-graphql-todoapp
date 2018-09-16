import gql from "graphql-tag";

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(input: {id: $id, clientMutationId: "wat"}) {
            todo {
                id
            }
        }
    }
`;

export const TODO_LIST = gql`
    query BasicTodoList($after: String!) {
        todos(first: 5, after: $after) {
            edges {
                node {
                    id
                    wpId: todoId
                    title
                    completed
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
