import AnnouncementCard from "./announcementCard";
import { Announcement } from "../../models/announcement";
import BaseSection, { BaseSectionProps, BaseSectionState } from "../../shared/components/baseSection/baseSection";
import { CardStyles } from "../../shared/components/baseCard/baseCard";
import DisplayedLanguage from "../../models/language";

interface AnnouncementSectionProps extends BaseSectionProps<Announcement> {

}

interface AnnouncementSectionState extends BaseSectionState {

}


export default class AnnouncementSection extends BaseSection<Announcement> {

    renderCard(object: Announcement, cardStyleIndex: number, language: DisplayedLanguage, id: number): JSX.Element {
        return <AnnouncementCard key={object.announcementID} object={object} cardStyleIndex={0} language={language} />;
    }

    render(): JSX.Element {
        const sectionStyle: string = this.props.customSectionStyle ? this.props.customSectionStyle : "base-section";
        if (!this.props.data.length) {
            return <></>;
        } else {
            return (
                <div className={sectionStyle}>
                    {this.props.data.map((object: Announcement, idx: number) => {
                        return this.renderCard(object, idx % CardStyles.length, DisplayedLanguage.Original, idx)
                    }
                    )}
                </div>
            );
        }
    }
}
