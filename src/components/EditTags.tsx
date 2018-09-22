import React from "react";
import {Mutation, Query} from "react-apollo";
import styled from "react-emotion";
import {MdAddBox} from "react-icons/md";

import {getEdgeNodes} from "../utils";

import {GetAllTags} from "./__generated__/GetAllTags";
import {SetTodoTags, SetTodoTagsVariables} from "./__generated__/SetTodoTags";
import {PlainButton, Row, View} from "./core";
import {GetAllTagsQuery, SetTodoTagsMutation} from "./queries";

const AddRowContainer = styled(Row)({
    justifyContent: "space-between",
});

const AddTagRow = (props: {id: string; tag: string}) => (
    <Mutation<SetTodoTags, SetTodoTagsVariables> mutation={SetTodoTagsMutation}>
        {addTags => (
            <AddRowContainer>
                #{props.tag}
                <PlainButton
                    onClick={() => {
                        addTags({
                            variables: {
                                id: props.id,
                                nodes: [{name: props.tag}],
                            },
                        });
                    }}
                >
                    <MdAddBox size={20} />
                </PlainButton>
            </AddRowContainer>
        )}
    </Mutation>
);

const EditTags = (props: {id: string}) => (
    <Query<GetAllTags> query={GetAllTagsQuery}>
        {res => {
            if (res.loading) return <p>Loading...</p>;
            if (res.error || !res.data) return <p>Error :(</p>;

            const tags = getEdgeNodes(res.data, "todoTags");

            return (
                <View>
                    {tags.map(t => (
                        <AddTagRow
                            key={props.id}
                            id={props.id}
                            tag={t.name || ""}
                        />
                    ))}
                </View>
            );
        }}
    </Query>
);

export default EditTags;
