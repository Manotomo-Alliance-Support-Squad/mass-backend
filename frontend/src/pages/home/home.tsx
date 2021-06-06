import React from 'react';
import ComboSection from '../../components/comboSection/comboSection';
import {Message} from "../../models/message";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {Announcement} from "../../models/announcement"
import {Artwork} from "../../models/artwork"
import {Video} from "../../models/video"
import './home.css';
import '../../shared/globalStyles/global.css'
import AnnouncementSection from "../../components/announcementSection/announcementSection"

// Hack for community card before messages
import { LanguageContext, LanguageContextValue } from '../../components/languageSwitch/languageContext';
import MessageCard from '../../components/messageSection/messageCard/messageCard';
import '../../components/headerSection/header.css';

export interface HomePageProps {

}

export interface HomePageState {
    artloading: boolean;
    messageLoaded: boolean;
    announcementLoaded: boolean;
    messages: Message[];
    announcements: Announcement[];
    artworks: Artwork[];
    videos: Video[];
}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps,
                private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
    }

    state: HomePageState = {
        artloading: true,
        messageLoaded: false,
        announcementLoaded: false,
        messages: [],
        announcements: [],
        artworks: [],
        videos: [],
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
        const cachedArtworks: Artwork[] | null = SessionService.getGallery();
        if (cachedArtworks && cachedArtworks.length) {
            this.setState({artloading: false, artworks: cachedArtworks});
        } else {
            this.manoAloeService.getGallery()
                .then((artworks: Artwork[]) => {
                    SessionService.saveGallery(artworks);
                    this.setState({artloading: false, artworks});
                })
                .catch((error: Error) => {
                    console.error(error);
                })
        }
        const cachedVideos: Video[] | null = SessionService.getVideo();
        if (cachedVideos && cachedVideos.length) {
            this.setState({videos: cachedVideos});
        } else {
            this.manoAloeService.getVideo()
                .then((videos: Video[]) => {
                    SessionService.saveVideo(videos);
                    this.setState({videos});
                })
                .catch((error: Error) => {
                    console.error(error);
                })
        }
    }

    renderCardSection(data: (Message|Artwork|Video)[]) {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.messageLoaded && this.state.announcementLoaded ? <ComboSection data={data}/> : <div/>}
                </div>
            </div>
        )
    }

    compileCardData() {
        // We do this because state setting is async and trying to create this in getData yields empty arrays
        let comboCardData: (Message|Artwork|Video)[] = [];
        // TODO: This can should be more generalized, but generally there will be fewer art than messages
        const art_cards_length = this.state.artworks.length;
        const message_cards_length = this.state.messages.length;
        const video_cards_length = this.state.videos.length;
        const index_increment_spacing = Math.floor(message_cards_length/art_cards_length);

        for (let msg_index = 0, art_index = 0, video_index = 0; msg_index < message_cards_length; msg_index++) {
            comboCardData.push(this.state.messages[msg_index]);
            if (art_index < art_cards_length && msg_index % index_increment_spacing === 0) {
                comboCardData.push(this.state.artworks[art_index]);
                art_index++;
                // Hack this in...
                if (video_index < video_cards_length) {
                    comboCardData.push(this.state.videos[video_index]);
                    video_index++;
                }
            }
        }
        return comboCardData
    }

    render() {
        const comboCardData = this.compileCardData()
        return (
            <section id='anchor'>
                <div className="home-root">
                    <div id="video-anchor" className="main-video-container">
                        <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/Snn2gWq-3KY" title="YouTube video player" frameBorder="0"></iframe>
                    </div>
                    <div className="separator">
                        <AnchorLink offset='120' href='#message-anchor'>
                            <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                        </AnchorLink>
                    </div>
                    <div id="message-anchor" className="justify-center">
                        <div className="justify-align-center">
                            <AnnouncementSection data={this.state.announcements} customSectionStyle="single-column notice-container"/>
                        </div>
                    </div>
                    <div className="justify-center padding-top">
                        <LanguageContext.Consumer>
                            {(value: LanguageContextValue) => {
                                const {language} = value;
                                return (
                                    <div className="justify-align-center notice-container" style={{"whiteSpace": "pre-line"}}>
                                        <MessageCard key={1} object={{ messageID: 0,
                                            orig_msg: "私たちは海外のあくあクルーの代表であり、日本人でもあなたのためにサポートプロジェクトを作りたいと思っていました\n\n\
                                            それほど多くはありませんが、あくたんは私たちがここにいることを忘れないでください、あなたを待って応援してくれることを願っています〜\n\n\
                                            そのために、元気を出してください！ あくたんがまた配信をするのを楽しみにしています",
                                            tl_msg: "We are some representatives of the Aqua Crew from all around the world. We wanted to create a support project for you. It's not much, but I hope Aqutan remember that we’re here waiting and cheering you on~ \n\n\
                                            With that said, please cheer up! We are looking forward for Aqutan’s return!",
                                            country: "", username: "AKUKIN HQ", }} cardStyleIndex={1} language={language} />
                                    </div>
                                    );
                                }
                            }
                        </LanguageContext.Consumer>
                    </div>
                    {this.renderCardSection(comboCardData)}
                    <div className="justify-center">
                        <div className="notice-container">
                            <div className="notice-content" style={{borderRadius: 0}}>
                                <p>These are all the messages we managed to collect!</p>
                                <p>Tweet at #TOBEDECIDED to send us a message!</p>
                                <p style={{fontSize: 12}}>If you find any problems with the website, or if you would like to report a message, please contact us at manotomo@googlegroups.com</p>
                                <p style={{fontSize: 12}}>This is not an official Hololive site. We are just a group of fans</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
