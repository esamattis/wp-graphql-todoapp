import React from "react";

import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag";
import {notEmpty, EdgeNode, getEdgeNodes} from "../utils";
import {BasicTodoList} from "./__generated__/BasicTodoList";
import {AddTodo, AddTodoVariables} from "./__generated__/AddTodo";

const TODO_LIST = gql`
    query BasicTodoList {
        todos {
            edges {
                node {
                    title
                    id
                }
            }
        }
    }
`;

const TodoList = () => (
    <Query<BasicTodoList> query={TODO_LIST}>
        {res => {
            if (res.loading) return <p>Loading...</p>;
            if (res.error) return <p>Error :(</p>;

            const data = res.data!;
            const lal: EdgeNode<typeof data, "todos"> = null as any;
            lal.id;

            // const foo = res.data!.todos;

            const todos = getEdgeNodes(res.data!, "todos");

            return (
                <div>
                    {todos.map(todo => (
                        <div key={todo.id}>{todo.title}</div>
                    ))}
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
