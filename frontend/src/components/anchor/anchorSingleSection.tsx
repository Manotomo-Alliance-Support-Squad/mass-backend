import React from "react";
import { Anchor, AnchorSectionProps } from "../../models/achor";
import AnchorButton from "./anchorButton";
import "./anchorSection.css";

interface AnchorSingleSectionProps extends AnchorSectionProps {
    anchor: Anchor;
}

export default class AnchorSingleSection extends React.Component<AnchorSingleSectionProps> {
    render() {
        const { anchor, position } = this.props;
        return (
            <div className={"anchor-section " + position}>
                <AnchorButton anchor={anchor} />
            </div>
        );
    }
}