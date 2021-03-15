import React from 'react';
import MessageCard from "./messageCard/messageCard";
import {Message} from "../../models/message";
import BaseSection, {BaseSectionProps, BaseSectionState} from "../../shared/components/baseSection/baseSection";
import {CardStyleLength} from "../../shared/components/baseCard/baseCard";
import DisplayedLanguage from "../../models/language";

interface MessageSectionProps extends BaseSectionProps<Message> {

}

interface MessageSectionState extends BaseSectionState {

}


export default class MessageSection extends BaseSection<Message> {

    renderCard(object: Message, cardStyleNum: number, language: DisplayedLanguage, id: number): JSX.Element {
        return (
            // TODO: This is not used and needs to be defined similar to card-section in comboSection component
            <div className="messagecard-center">
                <MessageCard key={object.messageID} object={object} cardStyleNum={id % CardStyleLength} language={language}/>
            </div>
        );
    }
}
