import gql from "graphql-tag";
import React from "react";
import {Mutation} from "react-apollo";

import {AddTodo, AddTodoVariables} from "./__generated__/AddTodo";
import {PlainButton, View, PlainInput, Row, RedButton, Colors} from "./core";
import {TODO_LIST} from "./queries";
import styled from "react-emotion";

const AddTodoButton = () => (
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
                Add
            </AddButton>
        )}
    </Mutation>
);

const initialInputState = {value: ""};

const AddInput = styled(PlainInput)({
    flex: 1,
    borderWidth: 5,
    borderColor: Colors.red,
    width: 350,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    outline: "none",
});

const InputRow = styled(Row)({
    height: 50,
});

const AddButton = styled(RedButton)({
    height: "100%",
    fontSize: 25,
    width: 100,
});

export class AddTodoInput extends React.Component<
    {},
    typeof initialInputState
> {
    state = initialInputState;

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
                <AddTodoButton />
            </InputRow>
        );
    }
}
