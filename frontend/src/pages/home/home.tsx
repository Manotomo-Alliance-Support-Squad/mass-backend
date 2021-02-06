import React from 'react';
import MessageSection from '../../components/messageSection/messageSection';
import ArchiveSection from '../../components/archiveSection/archiveSection';
import {Message} from "../../models/message";
import {toCountry} from "../../models/country";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {Announcement} from "../../models/announcement"
import './home.css';
import '../../shared/globalStyles/global.css'
import AnnouncementSection from "../../components/announcementSection/announcementSection"

export interface HomePageProps {

}

export interface HomePageState {
    messageLoaded: boolean;
    announcementLoaded: boolean;
    messages: Message[];
    announcements: Announcement[];
}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
    }

    state: HomePageState = {
        messageLoaded: false,
        announcementLoaded: false,
        messages: [],
        announcements: [],
    }

    componentDidMount() {
        this.getData();
    }

    private getData(): void {
        const cachedMessages: Message[] | null = SessionService.getMessages();
        if (cachedMessages && cachedMessages.length) {
            this.setState({messages: cachedMessages, messageLoaded: true});
        } else {
            this.setState({messageLoaded: false});
            this.manoAloeService.getAllMessages()
                .then((messages: Message[]) => {
                    for (let message of messages) {
                        message.country = toCountry(message.country as string);
                    }
                    SessionService.saveMessages(messages);
                    this.setState({messages, messageLoaded: true});
                })
                .catch((error: Error) => {
                    console.error(error);
                });
        }
        this.manoAloeService.getAllAnnouncements()
            .then((announcements: Announcement[]) => {
                this.setState({announcements, announcementLoaded: true});
            })
            .catch((error: Error) => {
                console.error(error);
            });
    }

    renderMessageCardSection() {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.messageLoaded && this.state.announcementLoaded ? <MessageSection data={this.state.messages}/> : <div/>}
                </div>
            </div>
        )
    }

    render() {
        return (
            <section id='anchor'>
                <div className="home-root">
                    <div className="video-container">
                    <section id='video-anchor'/>
                    <iframe title="Mano Aloe Fanmade Video" className="video-tag height-width-100"
                            src="https://www.youtube-nocookie.com/embed/1QdGzRGSuOM?rel=0" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                    </div>
                    <div className="separator">
                        <AnchorLink offset='120' href='#message-anchor'>
                            <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                        </AnchorLink>
                    </div>
                    <div id="message-anchor" className="justify-center padding-top">
                        <div className="justify-align-center">
                            <AnnouncementSection data={this.state.announcements} customSectionStyle="single-column notice-container"/>
                        </div>
                    </div>
                    {this.renderMessageCardSection()}
                    <div className="justify-center">
                        <div className="notice-container">
                            <div className="notice-content">
                                <p>These are all the messages we managed to collect! Happy Valentine's Day!</p>
                                <p>これがすべての取集したメッセージですが！ハッピーバレンタイン！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
