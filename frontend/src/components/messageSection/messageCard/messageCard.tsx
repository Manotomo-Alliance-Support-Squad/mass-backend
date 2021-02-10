import React from "react";
import classNames from 'classnames';
import {Message} from "../../../models/message";
import DisplayedLanguage from "../../../models/language";
import {ReactComponent as TranslateBotan} from "../../../assets/icons/translateIcon.svg";
import "./messageCard.css";
import { Twemoji } from 'react-emoji-render';
import BaseCard, {BaseCardProps, BaseCardState} from "../../../shared/components/baseCard/baseCard";

interface MessageCardProps extends BaseCardProps<Message>{
}

interface MessageCardState extends BaseCardState{
}

export default class MessageCard extends BaseCard<Message, MessageCardProps, MessageCardState> {
    private readonly message: Message;
    private readonly username: string;
    private readonly recipient: string;
    private readonly hasTlMsg: boolean;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.object;
        this.username = this.message.username ? props.object.username : "Anonymous";
        this.recipient = props.object.recipient;
        this.hasTlMsg = this.message.tl_msg != null && this.message.tl_msg !== "";

        this.toggleCurrentLanguage = this.toggleCurrentLanguage.bind(this);
    }
    private toggleCurrentLanguage(): void {
        this.setState((state: MessageCardState) => ({
            currentLanguage: state.currentLanguage === DisplayedLanguage.Original
                ? DisplayedLanguage.Japanese
                : DisplayedLanguage.Original
        }));
    }

    componentWillMount() {
        this.setState({
            currentLanguage: this.hasTlMsg ?  this.props.language : DisplayedLanguage.Original,
            globalLanguage: this.props.language
        });
    }

    componentDidUpdate() {
        if (this.state.globalLanguage !== this.props.language) {
            this.setState({
                currentLanguage: this.hasTlMsg ?  this.props.language : DisplayedLanguage.Original,
                globalLanguage: this.props.language
            });
        }
    }

    renderMessage() {
        return (
            <div>
                <div className="message-card-text-container">
                    <div className={classNames("message-card-text", {
                        "active-message": this.state.currentLanguage === DisplayedLanguage.Original,
                    })}>
                        <div>{this.message.orig_msg}</div>
                    </div>
                    {this.hasTlMsg &&
                    <div className={classNames("message-card-text", {
                        "active-message": this.state.currentLanguage === DisplayedLanguage.Japanese,
                    })}>
                        <div>{this.message.tl_msg}</div>
                    </div>
                    }
                    <div className="clear"/>
                </div>
                <div className="message-card-footer-container">
                    <div className="message-card-footer-text">
                        <p>From: {this.username}</p>
                        <p>To: {this.recipient}</p>
                    </div>
                    {this.hasTlMsg &&
                    <TranslateBotan className="message-card-translate" onMouseDown={this.toggleCurrentLanguage} />
                    }
                </div>
            </div>
        )
    }

    render() {
        return this.renderCard(this.renderMessage());
    }
}
