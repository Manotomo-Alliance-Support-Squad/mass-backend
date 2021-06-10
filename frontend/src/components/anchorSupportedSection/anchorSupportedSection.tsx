import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import { Anchor } from "../../models/achor";

interface AnchorSupportedSectionProps {
    anchor: Anchor,
    onVisible: (isVisible: boolean, href: string) => void;
}

export default class AnchorSupportedSection extends React.Component<AnchorSupportedSectionProps> {
    static onSectionVisible(component: any, isVisible: boolean, activeHref: string) {
        let { activeHrefs } = component.state;
        if (isVisible && !activeHrefs.find((href: string) => href === activeHref)) {
            activeHrefs.unshift(activeHref); // Insert most recent active href to first index
        } else if (!isVisible && activeHrefs.length > 1) {
            activeHrefs = activeHrefs.filter((href: string) => href !== activeHref); // Remove inactive href if there are more than 1 active href
        }
        component.setState({
            activeHrefs
        })
    }

    public render() {
        const { anchor, onVisible, children } = this.props;
        return (
            <div id={anchor.href.substring(1)}>
                <VisibilitySensor onChange={(isVisible: boolean) => onVisible(isVisible, anchor.href)}>
                    {children}
                </VisibilitySensor>
            </div>
        );
    }
}