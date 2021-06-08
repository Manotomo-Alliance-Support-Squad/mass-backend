import React from "react";
import { Anchor, AnchorSectionProps } from "../../models/achor";
import AnchorButton from "./anchorButton";
import "./anchorSection.css";

interface AnchorMultipleSectionProps extends AnchorSectionProps {
    anchors: Anchor[];
    activeHref: string;
}

export default class AnchorMultipleSection extends React.Component<AnchorMultipleSectionProps> {
    render() {
        const { anchors, position, activeHref } = this.props;
        return (
            <div className={"anchor-section multiple " + position} style={{ "--element-count": anchors.length } as React.CSSProperties}>
                {anchors.map(anchor => (
                    <div key={anchor.href} className={anchor.href === activeHref ? "active" : ""}>
                        <div className="anchor-seperator" />
                        <AnchorButton anchor={anchor} />
                    </div>
                ))}
            </div>
        );
    }
}