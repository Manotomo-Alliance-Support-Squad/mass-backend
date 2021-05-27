import { Component } from "react";
import CSS from "csstype";
import './baseCard.css';
import VisibilitySensor from "react-visibility-sensor";

import CardStyle1 from "../../../assets/cards/rara_header_haachama.png";
import CardStyle2 from "../../../assets/cards/rara_header2_haachama.png";


export const CardStyles = [
    [CardStyle1, "var(--main-text-wrapper-background-color)"],
    [CardStyle2, "var(--main-text-wrapper-background-color)"],
]

export interface BaseCardProps<T> {
    object: T;
    cardStyleIndex: number;
}

export interface BaseCardState {
    loaded: boolean;
}

export default class BaseCard<T, P extends BaseCardProps<T>, S extends BaseCardState> extends Component<P, S> {
    private readonly cardStyleIndex: number;

    constructor(props: P) {
        super(props);
        this.cardStyleIndex = this.props.cardStyleIndex >= CardStyles.length ? Math.floor(Math.random() * CardStyles.length) : this.props.cardStyleIndex;
    }

    state = {
        loaded: false
    } as S

    private toggleVisibility(inViewport: boolean): void {
        if (inViewport) {
            this.setState({ loaded: true });
        }
    }

    public renderCard(content: JSX.Element): JSX.Element {
        const { loaded } = this.state;
        const rootStyles: CSS.Properties = {
            backgroundImage: `url(${CardStyles[this.cardStyleIndex][0]})`,
            opacity: (loaded ? 1 : 0),
            backgroundColor: `${CardStyles[this.cardStyleIndex][1]}`,
        };
        return (
            <VisibilitySensor onChange={this.toggleVisibility.bind(this)} partialVisibility active={!loaded}>
                <div className="base-card" style={rootStyles}>
                    <div className="card-header" />
                    {content}
                </div>
            </VisibilitySensor>
        );
    }
}
