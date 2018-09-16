import React from "react";
import styled from "react-emotion";

import {CompleteButton} from "./CompleteButton";
import {Colors, Title, View} from "./core";
import {DeleteButton} from "./DeleteButton";

const TodoItemContainer = styled(View)({
    backgroundColor: Colors.black,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    width: 300,
});

const DelebuttonPosition = styled(View)({
    position: "absolute",
    top: 10,
    right: 10,
});

export const TodoItem = (props: {
    id: string;
    wpId: number;
    title: string;
    completed: boolean;
}) => (
    <TodoItemContainer>
        <Title level="3">
            {props.title} ({props.wpId})
        </Title>
        <View style={{height: 25}} />
        <CompleteButton
            id={props.id}
            action={props.completed ? "revert" : "complete"}
        />
        {props.completed && (
            <DelebuttonPosition>
                <DeleteButton id={props.id} />
            </DelebuttonPosition>
        )}
    </TodoItemContainer>
);
