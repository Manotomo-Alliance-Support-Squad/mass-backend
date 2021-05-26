import {Artwork} from '../../models/artwork';
import {Message} from "../../models/message";
import {Video} from "../../models/video";
import DisplayedLanguage from "../../models/language";
import ArtworkCard from '../gallery/artworkCard/artworkCard';
import VideoCard from '../videoSection/videoCard';
import MessageCard from "../messageSection/messageCard/messageCard";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import {CardStyleLength} from "../../shared/components/baseCard/baseCard";

import './comboSection.css';

interface ComboSectionProps extends BaseSectionProps<Message|Artwork|Video> {
}

interface ComboSectionState extends BaseSectionState {

}

export default class ComboSection extends BaseSection<Message|Artwork|Video> {

    renderCard(object: (Message|Artwork|Video), cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        // TODO: messagecard-center might not used or needed
        if ("messageID" in object) {
            return (
                <div className="card-section">
                    <MessageCard key={object.messageID} object={object} cardStyleNum={id % CardStyleLength} language={language}/>
                </div>
            );
        } else if ("artworkID" in object) {
            return (
                <div className="card-section">
                    <ArtworkCard key={object.artworkID} object={object} cardStyleNum={id % CardStyleLength}/>
                </div>
            );
        } else if ("videoID" in object) {
            return (
                <div className="card-section">
                    <VideoCard key={object.videoID} object={object} cardStyleNum={id % CardStyleLength}/>
                </div>
            );
        }
        return (<div/>);
    }
}
