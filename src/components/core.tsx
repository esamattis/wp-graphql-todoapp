import styled from "react-emotion";

export const Colors = {
    red: "#ee383a",
    black: "#201e1c",
    white: "white",
};

export const View = styled.div({
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    fontFamily: "'Signika', sans-serif",
});

export const Row = styled(View)({
    flexDirection: "row",
});

export const Title = styled(View)<{level: "1" | "2"}>(
    {
        color: Colors.white,
        fontWeight: "bold",
    },
    props => ({
        fontSize: {
            1: 40,
            2: 30,
        }[props.level],
    }),
);

export const PlainButton = styled(View.withComponent("button"))({
    backgroundColor: "transparent",
    border: 0,
    cursor: "pointer",
});

export const RedButton = styled(PlainButton)({
    backgroundColor: Colors.red,
    color: Colors.white,
    padding: 10,
});
