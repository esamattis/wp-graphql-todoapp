import styled from "react-emotion";

export const COLORS = {};

export const View = styled.div({
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
});

export const Row = styled(View)({
    flexDirection: "row",
});
