import React from "react";
import styled from "react-emotion";
import {NavLink as Link} from "react-router-dom";

import {View} from "./core";
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

const TagList = (props: {tags: string[]}) => (
    <Popover renderPopover={() => <EditTags />}>
        {actions => (
            <Container>
                <TagListWrap innerRef={actions.wrapRef}>
                    {props.tags.map(tag => (
                        <TagLink key={tag} to={`/tag/${tag}`}>
                            #{tag}
                        </TagLink>
                    ))}
                </TagListWrap>
                <button onClick={actions.open}>e</button>
            </Container>
        )}
    </Popover>
);

export default TagList;
