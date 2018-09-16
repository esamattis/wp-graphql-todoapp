import React from "react";
import {Mutation} from "react-apollo";
import styled from "react-emotion";
import {FaTrash} from "react-icons/fa";

import {DeleteTodo, DeleteTodoVariables} from "./__generated__/DeleteTodo";
import {Colors, PlainButton, View} from "./core";
import {DELETE_TODO, TODO_LIST} from "./queries";

const DeleteIcon = styled(View.withComponent(FaTrash))({
    height: 30,
    width: 30,
    color: Colors.red,
    transition: "all .2s ease-in-out",
    ":hover": {
        transform: "scale(1.1)",
    },
});

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
                    <DeleteIcon />
                </PlainButton>
            </div>
        )}
    </Mutation>
);
