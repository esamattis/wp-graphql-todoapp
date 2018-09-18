import React from "react";
import {Mutation} from "react-apollo";
import styled from "react-emotion";
import {FaTrash} from "react-icons/fa";

import {DeleteTodo, DeleteTodoVariables} from "./__generated__/DeleteTodo";
import {Colors, PlainButton, View} from "./core";
import {DeleteTodoMutation} from "./queries";

const DeleteIcon = styled(View.withComponent(FaTrash))({
    height: 20,
    width: 20,
    color: Colors.red,
    transition: "all .2s ease-in-out",
    ":hover": {
        transform: "scale(1.2) rotate(20deg)",
        color: Colors.white,
    },
});

export const DeleteButton = (props: {id: string}) => (
    <Mutation<DeleteTodo, DeleteTodoVariables> mutation={DeleteTodoMutation}>
        {(toggle, res) => (
            <div>
                <PlainButton
                    onClick={async () => {
                        const toggleRes = await toggle({
                            variables: {
                                id: props.id,
                            },
                        });
                        if (toggleRes) {
                            console.log(
                                "completion mutation results",
                                toggleRes.data,
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
