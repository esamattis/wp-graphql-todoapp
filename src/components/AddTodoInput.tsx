import gql from "graphql-tag";
import React from "react";
import {Mutation} from "react-apollo";
import styled from "react-emotion";

import {AddTodo, AddTodoVariables} from "./__generated__/AddTodo";
import {Colors, PlainButton, PlainInput, RedButton, Row, View} from "./core";
import {TODO_LIST} from "./queries";

const AddTodoButton = (props: {value: string; onSave: () => void}) => (
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
            <AddButton
                onClick={async () => {
                    const res = await add({
                        variables: {title: props.value},
                        refetchQueries: [{query: TODO_LIST}],
                    });
                    if (res) {
                        console.log("mutation results", res);
                        props.onSave();
                    }
                }}
            >
                Add
            </AddButton>
        )}
    </Mutation>
);

const AddInput = styled(PlainInput)({
    flex: 1,
    borderWidth: 5,
    borderRightWidth: 0,
    borderColor: Colors.red,
    width: 350,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
});

const InputRow = styled(Row)({
    height: 50,
});

const AddButton = styled(RedButton)({
    height: "100%",
    fontSize: 25,
    width: 100,
});

const initialInputState = {value: ""};

export class AddTodoInput extends React.Component<
    {},
    typeof initialInputState
> {
    state = initialInputState;

    clear = () => {
        this.setState({value: ""});
    };

    render() {
        return (
            <InputRow>
                <AddInput
                    value={this.state.value}
                    autoFocus
                    placeholder="What to do?"
                    onChange={e => {
                        this.setState({value: e.target.value});
                    }}
                />
                <AddTodoButton value={this.state.value} onSave={this.clear} />
            </InputRow>
        );
    }
}
