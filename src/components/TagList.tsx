import React from "react";
import styled from "react-emotion";
import {NavLink as Link} from "react-router-dom";

import {View} from "./core";

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

const TagList = (props: {tags: string[]}) => (
    <Container>
        {props.tags.map(tag => (
            <TagLink key={tag} to={`/tag/${tag}`}>
                #{tag}
            </TagLink>
        ))}
    </Container>
);

export default TagList;
