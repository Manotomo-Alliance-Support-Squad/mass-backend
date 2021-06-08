import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Anchor } from "../../models/achor";
import "./anchorSection.css"

interface AnchorButtonProps {
    anchor: Anchor
}

export default class AnchorButton extends React.Component<AnchorButtonProps> {
    render() {
        const { anchor } = this.props;
        return (
            <div className="anchor-button">
                <AnchorLink href={anchor.href}>
                    {anchor.svgIcon && <anchor.svgIcon />}
                    {anchor.text && <p>{anchor.text}</p>}
                </AnchorLink>
            </div>
        );
    }
}