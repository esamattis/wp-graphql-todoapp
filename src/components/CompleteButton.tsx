import React from "react";
import {Mutation} from "react-apollo";

import {
    SetTodoCompletion,
    SetTodoCompletionVariables,
} from "./__generated__/SetTodoCompletion";
import {RedButton} from "./core";
import {SET_COMPLETED, TODO_LIST} from "./queries";

export const CompleteButton = (props: {
    id: string;
    action: "complete" | "revert";
}) => (
    <Mutation<SetTodoCompletion, SetTodoCompletionVariables>
        mutation={SET_COMPLETED}
    >
        {(toggle, res) => (
            <div>
                <RedButton
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
                </RedButton>
            </div>
        )}
    </Mutation>
);
