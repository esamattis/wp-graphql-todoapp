import gql from "graphql-tag";
import React from "react";
import {Mutation} from "react-apollo";

import {AddTodo, AddTodoVariables} from "./__generated__/AddTodo";
import {PlainButton} from "./core";
import {TODO_LIST} from "./queries";

export const AddTodoInput = () => (
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
        {add => (
            <div>
                <PlainButton
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
                </PlainButton>
            </div>
        )}
    </Mutation>
);
