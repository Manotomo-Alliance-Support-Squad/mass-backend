import React from "react";
import {Announcement} from "../../models/announcement";
import BaseCard, {BaseCardProps, BaseCardState} from "../../shared/components/baseCard/baseCard";
import DisplayedLanguage from "../../models/language";

interface AnnouncementCardProps extends BaseCardProps<Announcement> {
    language: DisplayedLanguage;
}

interface AnnouncementCardState extends BaseCardState {
}

export default class AnnouncementCard extends BaseCard<Announcement, AnnouncementCardProps, AnnouncementCardState> {
    private readonly announcement: Announcement;

    constructor(props: AnnouncementCardProps) {
        super(props);
        this.announcement = props.object;
    }

    renderAnnouncement() {
        return (
            <div className="notice-content">
                {this.announcement.message}
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderAnnouncement());
    }
}
