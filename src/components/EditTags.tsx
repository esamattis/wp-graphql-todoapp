import React from "react";
import {Mutation, Query} from "react-apollo";
import styled from "react-emotion";
import {MdAddBox} from "react-icons/md";

import {GetAllTags} from "../__generated__/GetAllTags";
import {SetTodoTags, SetTodoTagsVariables} from "../__generated__/SetTodoTags";
import {GetAllTagsQuery, SetTodoTagsMutation} from "../queries";
import {getEdgeNodes} from "../utils";

import {PlainButton, Row, View} from "./core";

const AddRowContainer = styled(Row)({
    justifyContent: "space-between",
});

const AddTagRow = (props: {postId: string; tag: string}) => (
    <Mutation<SetTodoTags, SetTodoTagsVariables> mutation={SetTodoTagsMutation}>
        {addTags => (
            <AddRowContainer>
                #{props.tag}
                <PlainButton
                    onClick={() => {
                        addTags({
                            variables: {
                                id: props.postId,
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

const EditTags = (props: {postId: string}) => (
    <Query<GetAllTags> query={GetAllTagsQuery}>
        {res => {
            if (res.loading) return <p>Loading...</p>;
            if (res.error || !res.data) return <p>Error :(</p>;

            const tags = getEdgeNodes(res.data, "todoTags");

            return (
                <View>
                    {tags.map(t => (
                        <AddTagRow
                            key={t.id}
                            postId={props.postId}
                            tag={t.name || ""}
                        />
                    ))}
                </View>
            );
        }}
    </Query>
);

export default EditTags;
