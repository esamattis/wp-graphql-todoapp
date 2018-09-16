import styled from "react-emotion";

export const Colors = {
    red: "#ee383a",
    black: "#201e1c",
    white: "white",
};

export const View = styled.div({
    display: "flex",
    position: "relative",
    flexDirection: "column",
    boxSizing: "border-box",
    fontFamily: "'Signika', sans-serif",
});

export const Row = styled(View)({
    flexDirection: "row",
});

export const Title = styled(View)<{level: "1" | "2" | "3"}>(
    {
        color: Colors.white,
        fontWeight: "bold",
    },
    props => ({
        fontSize: {
            1: 50,
            2: 30,
            3: 20,
        }[props.level],
    }),
);

export const PlainInput = styled(View.withComponent("input"))({
    borderStyle: "solid",
    outline: "none",
});

export const PlainButton = styled(View.withComponent("button"))({
    backgroundColor: "transparent",
    border: 0,
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
});

export const RedButton = styled(PlainButton)({
    backgroundColor: Colors.red,
    color: Colors.white,
    padding: 10,
    minWidth: 100,
    borderWidth: 5,
    fontSize: 18,
    borderColor: Colors.red,
    transition: "all .2s ease-in-out",
    borderStyle: "solid",
    ":hover": {
        color: Colors.red,
        backgroundColor: Colors.white,
    },
});
