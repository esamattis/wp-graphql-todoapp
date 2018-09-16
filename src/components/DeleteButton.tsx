import React from "react";
import {Mutation} from "react-apollo";

import {DeleteTodo, DeleteTodoVariables} from "./__generated__/DeleteTodo";
import {PlainButton} from "./core";
import {DELETE_TODO, TODO_LIST} from "./queries";

export const DeleteButton = (props: {id: string}) => (
    <Mutation<DeleteTodo, DeleteTodoVariables> mutation={DELETE_TODO}>
        {(toggle, res) => (
            <div>
                <PlainButton
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
                </PlainButton>
            </div>
        )}
    </Mutation>
);
