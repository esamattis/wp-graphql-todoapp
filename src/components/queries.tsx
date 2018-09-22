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
                            id
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

export const DualTodoListByTagsQuery = gql`
    ${TodoFragment}
    query DualTodoListByTags(
        $todoTags: [String!]!
        $cursorTodos: String!
        $cursorDones: String!
    ) {
        todos(
            first: 3
            after: $cursorTodos
            where: {
                completed: false
                taxQuery: {
                    taxArray: [
                        {
                            terms: $todoTags
                            taxonomy: TODOTAG
                            operator: IN
                            field: NAME
                        }
                    ]
                }
            }
        ) {
            ...TodoParts
        }
        dones: todos(
            first: 3
            after: $cursorDones
            where: {
                completed: true
                taxQuery: {
                    taxArray: [
                        {
                            terms: $todoTags
                            taxonomy: TODOTAG
                            operator: IN
                            field: NAME
                        }
                    ]
                }
            }
        ) {
            ...TodoParts
        }
    }
`;

//  where: {taxQuery: {relation: AND, taxArray: [{terms: ["mytag"], taxonomy: TODOTAG, operator: IN, field: NAME}]}})

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

export const GetAllTagsQuery = gql`
    query GetAllTags {
        todoTags(first: 99) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;

export const SetTodoTagsMutation = gql`
    mutation SetTodoTags($id: ID!, $nodes: [todoTodoTagsNodes!]!) {
        updateTodo(
            input: {
                id: $id
                clientMutationId: "sdf"
                todoTags: {append: true, nodes: $nodes}
            }
        ) {
            todo {
                id
                todoTags(first: 99) {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;
