import React from "react";
import CSS from "csstype";
import './baseCard.css';
import VisibilitySensor from "react-visibility-sensor";

import CardStyle2 from "../../../assets/cards/card2.svg";


// TODO(#32): Change this to a class prop so inheriting classes can override it
const CardStyleArr: Array<Array<string>> = [
    ["", "#f12169bf"],
]
// TODO(#32): Remove when CardStyleArr is a prop, and exporting this value is no longer necessary
export const CardStyleLength: number =
    CardStyleArr.length > 1 ? CardStyleArr.length : 1;

export interface BaseCardProps<T> {
    object: T;
    cardStyleNum: number;
}

export interface BaseCardState {
    inViewport: boolean;
}

export default class BaseCard<T, P extends BaseCardProps<T>, S extends BaseCardState> extends React.Component<P, S> {
    public readonly cardStyleNum: number;

    constructor(props: P) {
        super(props);
        this.cardStyleNum = props.cardStyleNum;
    }

    state = {
        inViewport: false
    } as S

    private toggleVisibility(inViewport: boolean): void {
        this.setState({inViewport});
    }

    public renderCard(content: JSX.Element): JSX.Element {
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyleArr[this.cardStyleNum][0]})`,
            opacity: (this.state.inViewport ? 1 : 0),
            backgroundColor: `${ CardStyleArr[this.cardStyleNum][1] }`,
        };
        return(
            <VisibilitySensor onChange={this.toggleVisibility.bind(this)} partialVisibility>
                <div className="base-card" style={rootStyles}>
                    {content}
                </div>
            </VisibilitySensor>
        );
    }
}
