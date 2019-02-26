import styled from "@emotion/styled";
import React from "react";
import {MdEdit} from "react-icons/md";
import {NavLink as Link} from "react-router-dom";

import {PlainButton, View} from "./core";
import EditTags from "./EditTags";
import Popover from "./Popover";

const Container = styled(View)({
    flexDirection: "row",
    fontFamily: "monospace",
});

const TagLink = styled(Link)({
    color: "white",
    marginRight: 5,
    textDecoration: "none",
    ":visited": {
        color: "white",
    },
    ":hover": {
        textDecoration: "underline",
    },
});

const TagListWrap = styled(View)({
    flexDirection: "row",
});

const TagList = (props: {id: string; tags: string[]}) => (
    <Popover renderPopover={() => <EditTags postId={props.id} />}>
        {actions => (
            <Container>
                <TagListWrap ref={actions.wrapRef as any}>
                    {props.tags.map(tag => (
                        <TagLink key={tag} to={`/tag/${tag}`}>
                            #{tag}
                        </TagLink>
                    ))}
                </TagListWrap>
                <PlainButton onClick={actions.open}>
                    <MdEdit color="white" />
                </PlainButton>
            </Container>
        )}
    </Popover>
);

export default TagList;
