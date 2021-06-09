export interface Anchor {
    href: string;
    svgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | null;
    text?: string;
}

export enum AnchorSectionPosition {
    LEFT = "left",
    RIGHT = "right",
    TOP_LEFT = "top left",
    TOP_RIGHT = "top right",
    BOTTOM_LEFT = "bottom left",
    BOTTOM_RIGHT = "bottom right",
}

export interface AnchorSectionProps {
    position: AnchorSectionPosition;
}