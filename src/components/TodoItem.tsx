import React from "react";
import styled from "react-emotion";

import {CompleteButton} from "./CompleteButton";
import {Colors, Title, View} from "./core";
import {DeleteButton} from "./DeleteButton";

const TodoItemContainer = styled(View)({
    backgroundColor: Colors.black,
    margin: 10,
    padding: 10,
    borderRadius: 10,
});

export const TodoItem = (props: {
    id: string;
    title: string;
    completed: boolean;
}) => (
    <TodoItemContainer>
        <Title level="2">{props.title}</Title>
        <CompleteButton
            id={props.id}
            action={props.completed ? "revert" : "complete"}
        />
        {props.completed && <DeleteButton id={props.id} />}
    </TodoItemContainer>
);
