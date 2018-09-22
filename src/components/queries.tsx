import gql from "graphql-tag";

export const TodoFragment = gql`
    fragment TodoParts on RootTodosConnection {
        pageInfo {
            endCursor
            hasNextPage
        }
        edges {
            node {
                id
                wpId: todoId
                title
                completed
                status
                tags: todoTags(first: 99) {
                    edges {
                        node {
                            name
                        }
                    }
                }
            }
        }
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
            ...TodoParts
        }
        dones: todos(first: 3, after: $cursorDones, where: {completed: true}) {
            ...TodoParts
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
