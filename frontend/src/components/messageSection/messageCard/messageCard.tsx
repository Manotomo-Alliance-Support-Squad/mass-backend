import React, { Component } from "react";
import classNames from 'classnames';
import {Country} from "../../../models/country";
import {Message} from "../../../models/message";
import DisplayedLanguage from "../../../models/language";
import {ReactComponent as TranslateBotan} from "../../../assets/icons/translateIcon.svg";
import "./messageCard.css";
import { Twemoji } from 'react-emoji-render';
import BaseCard, {BaseCardProps, BaseCardState} from "../../../shared/components/baseCard/baseCard";

interface MessageCardProps extends BaseCardProps<Message>{
    language: DisplayedLanguage;
}

interface MessageCardState extends BaseCardState{
    currentLanguage: DisplayedLanguage;
    globalLanguage: DisplayedLanguage;
    height: number;
}

function countryCodeToFlag(code: Country): string {
    // Offset between Latin uppercase A-Z and Countryal Indicator Symbols A-Z
    const RI_OFFSET = 0x1F1A5;

    if (code.length !== 2) return "";

    let first = code.charCodeAt(0);
    if (first < 0x41 && first > 0x5A) return "";
    first += RI_OFFSET;

    let second = code.charCodeAt(1);
    if (second < 0x41 && second > 0x5A) return "";
    second += RI_OFFSET;

    return String.fromCodePoint(first, second);
}

export default class MessageCard extends BaseCard<Message, MessageCardProps, MessageCardState> {
    private readonly message: Message;
    private readonly flag: string;
    private readonly hasTlMsg: boolean;
    private targetref: React.RefObject<HTMLInputElement>;
    private messageref: React.RefObject<HTMLInputElement>;

    constructor(props: MessageCardProps) {
        super(props);
        this.message = props.object;
        this.flag = countryCodeToFlag(props.object.country);
        this.hasTlMsg = this.message.tl_msg != null && this.message.tl_msg !== "";

        this.toggleCurrentLanguage = this.toggleCurrentLanguage.bind(this);
        this.targetref = React.createRef();
        this.messageref = React.createRef();
    }

    state = {
        currentLanguage: this.props.language,
        globalLanguage: this.props.language,
        height: 0
    } as MessageCardState

    private toggleCurrentLanguage(): void {
        this.setState((state: MessageCardState) => ({
            currentLanguage: state.currentLanguage === DisplayedLanguage.Original
                ? DisplayedLanguage.Japanese
                : DisplayedLanguage.Original
        }));
        console.log("transleet botan");
    }

    componentDidMount() {
        // FIXME: Remove ignore
        // @ts-ignore: Object is possibly 'null'
        var newheight = ( this.targetref.current.clientHeight > this.messageref.current.clientHeight ) ? this.targetref.current.clientHeight: this.messageref.current.clientHeight;
        this.setState({height: newheight});
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

    getMessage() {
        var message: string|null;
        message = this.message.orig_msg
        if (this.message.tl_msg) {
            message = (this.state.currentLanguage === DisplayedLanguage.Japanese) ? this.message.tl_msg : this.message.orig_msg
        }
        return message
    }

    renderMessage() {
        var message = this.getMessage();
        return (
            <div>
                <div className="message-card-text-container" style={{height: this.state.height+"px"}}>
                    <p className="hidden" ref={this.targetref} >
                        {this.message.tl_msg}
                    </p>
                    <p className="message-card-text" ref={this.messageref}>
                        {message}
                    </p>
                </div>
                <div className="message-card-footer-container">
                    <div className="message-card-footer-text">
                        {this.message.username}
                        <Twemoji text={this.flag} />
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
