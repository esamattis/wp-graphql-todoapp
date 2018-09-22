import React from "react";
import {Mutation} from "react-apollo";
import styled from "react-emotion";
import {IoMdArrowRoundBack, IoMdArrowRoundForward} from "react-icons/io";

import {
    SetTodoCompletion,
    SetTodoCompletionVariables,
} from "../__generated__/SetTodoCompletion";
import {SetCompletedMutation} from "../queries";

import {RedButton} from "./core";

const DoneIcon = () => (
    <IoMdArrowRoundForward size="30" style={{alignSelf: "flex-end"}} />
);

const BackIcon = () => <IoMdArrowRoundBack size="30" />;

const WrappingButton = styled(RedButton)({
    height: 40,
    padding: 0,
});

export const CompleteButton = (props: {
    id: string;
    action: "complete" | "revert";
}) => (
    <Mutation<SetTodoCompletion, SetTodoCompletionVariables>
        mutation={SetCompletedMutation}
    >
        {toggle => (
            <WrappingButton
                onClick={async () => {
                    const toggleRes = await toggle({
                        variables: {
                            id: props.id,
                            completed:
                                props.action === "complete" ? true : false,
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
                {props.action === "complete" ? <DoneIcon /> : <BackIcon />}
            </WrappingButton>
        )}
    </Mutation>
);
