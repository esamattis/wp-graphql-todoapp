import React from "react";
import {Mutation} from "react-apollo";
import styled from "react-emotion";

import {AddTodo, AddTodoVariables} from "./__generated__/AddTodo";
import {Colors, PlainInput, RedButton, Row} from "./core";
import {ADD_TODO, TODO_LIST} from "./queries";

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
            <Mutation<AddTodo, AddTodoVariables> mutation={ADD_TODO}>
                {add => {
                    const addTodo = async () => {
                        if (this.state.value.trim() !== "") {
                            return;
                        }
                        await add({
                            variables: {title: this.state.value},
                            refetchQueries: [{query: TODO_LIST}],
                        });
                        this.clear();
                    };

                    return (
                        <InputRow>
                            <AddInput
                                value={this.state.value}
                                autoFocus
                                placeholder="What to do?"
                                onChange={e => {
                                    this.setState({value: e.target.value});
                                }}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        addTodo();
                                    }
                                }}
                            />
                            <AddButton onClick={addTodo}>Add</AddButton>
                        </InputRow>
                    );
                }}
            </Mutation>
        );
    }
}
