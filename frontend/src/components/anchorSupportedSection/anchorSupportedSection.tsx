import React from "react";
import VisibilitySensor from "react-visibility-sensor";

interface AnchorSupportedSectionProps {
    href: string,
    onVisible: (href: string) => void;
}

export default class AnchorSupportedSection extends React.Component<AnchorSupportedSectionProps> {
    public render() {
        const { href, onVisible, children } = this.props;
        return (
            <div id={href.substring(1)}>
                <VisibilitySensor onChange={(isVisible: boolean) => { isVisible && onVisible(href) }}>
                    {children}
                </VisibilitySensor>
            </div>
        );
    }
}