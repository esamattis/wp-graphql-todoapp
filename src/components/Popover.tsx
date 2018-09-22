import React from "react";
import ReactDOM from "react-dom";
import styled from "react-emotion";

const Z_INDICES = {
    popover: 10,
    popoverContent: 15,
};

const ARROW_SIZE = "10px";

const OverlayContainer = styled.div({
    display: "flex",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: Z_INDICES.popover,
});

const transforms = {
    down: "translateX(-50%)",
    left: "translate(-100%, -50%)",
    up: "translate(-50%, -100%)",
};

type IPosition = keyof typeof transforms;

const Box = styled.div<{
    top: number;
    left: number;
    position: string;
}>(
    {
        display: "flex",
        zIndex: Z_INDICES.popoverContent,
        position: "absolute",
        flexDirection: "column",
        alignItems: "center",
        padding: ARROW_SIZE,
    },
    props => ({
        top: props.top,
        left: props.left,
        transform: props.position,
    }),
);

const BoxArrow = styled.div({
    display: "flex",
    width: 0,
    height: 0,
    borderLeft: `${ARROW_SIZE} solid transparent`,
    borderRight: `${ARROW_SIZE} solid transparent`,
    borderBottom: `${ARROW_SIZE} solid white`,
    transform: "translateX(-25%)",
});

const BoxArrowPositioner = styled.div<{position: IPosition}>(
    {
        display: "flex",
        position: "absolute",
        width: ARROW_SIZE,
        heigth: ARROW_SIZE,
    },
    props => {
        if (props.position === "down") {
            return {
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
            };
        } else if (props.position === "left") {
            return {
                transform: "rotate(90deg) translateX(-50%)",
                right: 0,
                top: "50%",
            };
        }
        return {};
    },
);

const BoxContent = styled.div({
    display: "flex",
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
    border: "1px solid lightgray",
});

const Padding = styled.div({
    display: "flex",
    padding: 10,
});

interface IPopoverActions {
    open: () => void;
    close: () => void;
    wrapRef: React.RefObject<HTMLElement>;
}

interface IProps {
    children: (actions: IPopoverActions) => React.ReactNode;
    position?: IPosition;
    renderPopover(props: {close: () => void}): React.ReactNode;
}

interface IState {
    visible: boolean;
    position: {top: number; left: number};
}

class Popover extends React.Component<IProps, IState> {
    overlayContainer!: HTMLElement;

    wrapRef = React.createRef<HTMLElement>();

    constructor(props: IProps) {
        super(props);
        this.state = {
            position: {top: 0, left: 0},
            visible: false,
        };
    }

    componentDidMount() {
        const el = document.getElementById("overlay-container");
        if (el) {
            this.overlayContainer = el;
        } else {
            throw new Error("Popover: cannot find overlay-container");
        }
    }

    close = () => {
        setTimeout(() => {
            this.setState({visible: false});
        }, 0);
    };

    handleWrapClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).dataset.popoveroverlay) {
            this.close();
        }
    };

    open = () => {
        this.updatePosition();
    };

    getPosition(): IPosition {
        return this.props.position || "down";
    }

    updatePosition = () => {
        if (!this.wrapRef.current) {
            return;
        }

        const rect = this.wrapRef.current.getBoundingClientRect();

        const center = {
            top: rect.top + rect.height / 2,
            left: rect.left + rect.width / 2,
        };

        // const isTop = window.innerHeight / 2 - center.top > 0;
        // const isRight = window.innerWidth / 2 - center.left < 0;

        let left: number;
        let top: number;

        const position = this.getPosition();
        if (position === "down") {
            left = center.left;
            top = rect.top + rect.height;
        } else if (position === "up") {
            left = center.left;
            top = rect.top;
        } else {
            // left
            left = rect.left;
            top = center.top;
        }

        this.setState({
            visible: true,
            position: {
                top,
                left,
            },
        });
    };

    handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as any).dataset.popoveroverlay) {
            this.close();
        }
    };

    render() {
        return (
            <>
                {this.props.children({
                    open: this.open,
                    close: this.close,
                    wrapRef: this.wrapRef,
                })}
                {this.state.visible &&
                    ReactDOM.createPortal(
                        <OverlayContainer
                            data-popoveroverlay
                            onClick={this.handleOverlayClick}
                        >
                            <Box
                                position={transforms[this.getPosition()]}
                                top={this.state.position.top}
                                left={this.state.position.left}
                            >
                                <BoxContent>
                                    <Padding>
                                        {this.props.renderPopover({
                                            close: this.close,
                                        })}
                                    </Padding>
                                </BoxContent>
                                <BoxArrowPositioner
                                    position={this.getPosition()}
                                >
                                    <BoxArrow />
                                </BoxArrowPositioner>
                            </Box>
                        </OverlayContainer>,
                        this.overlayContainer,
                    )}
            </>
        );
    }
}

export default Popover;
