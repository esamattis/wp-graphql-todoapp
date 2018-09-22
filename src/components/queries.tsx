import gql from "graphql-tag";

export const TodoFragment = gql`
    fragment TodoParts on Todo {
        id
        wpId: todoId
        title
        completed
        status
    }
`;

export const DeleteTodoMutation = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(input: {id: $id, clientMutationId: "wat"}) {
            todo {
                id
                status
            }
        }
    }
`;

export const DualTodoListQuery = gql`
    ${TodoFragment}
    query DualTodoList($cursorTodos: String!, $cursorDones: String!) {
        todos(first: 3, after: $cursorTodos, where: {completed: false}) {
            edges {
                node {
                    ...TodoParts
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
                    ...TodoParts
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

export const SetCompletedMutation = gql`
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
export const AddTodoMutation = gql`
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
