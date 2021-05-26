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

// credits at bottom of the site
import { useLocation } from 'react-router-dom';
import InPageNav from '../../components/inPageNav/inPageNav';
import InfoIcon from '@material-ui/icons/Info';


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

const AltNav = () => {
    const location = useLocation();
    if (location.pathname == "/home") {
        return <InPageNav navButtons={creditsNav}/>;
    }
    return <span />
};

const creditsNav = [
    {
        link: 'https://github.com/Manotomo-Alliance-Support-Squad/WWS',
        buttonContent: "Credits",
        page: "",
        startIcon: <InfoIcon />
    },
]

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
                    <div className="separator">
                        <AnchorLink offset='120' href='#video-anchor'>
                            <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                        </AnchorLink>
                    </div>
                    <div id="video-anchor" className="main-video-container">
                        <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/i3EBEbdSyTE" title="YouTube video player" frameBorder="0"></iframe>
                    </div>
                    <div id="message-anchor" className="justify-center">
                        <div className="justify-align-center">
                            <AnnouncementSection data={this.state.announcements} customSectionStyle="single-column notice-container"/>
                        </div>
                    </div>
                    <div className="separator">
                        <AnchorLink offset='120' href='#message-anchor'>
                            <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                        </AnchorLink>
                    </div>
                    <div className="justify-center padding-top">
                        <LanguageContext.Consumer>
                            {(value: LanguageContextValue) => {
                                const {language} = value;
                                return (
                                    <div className="justify-align-center notice-container" style={{"whiteSpace": "pre-line"}}>
                                        <MessageCard key={1} object={{ messageID: 0,
                                            tl_msg: "To Haato-sama,\n\n\
                                            I am the initiator of this project, W.Y. Hsieh.\n\n\
                                            Although I have been joining your membership for only a month, every time I see you fully engaged in streams and plans, I couldn’t help but feel encouraged by your strong passion. Without consciousness, I eventually started to cry for your touching moments and feel truly-warmed when you look happy.\n\n\
                                            At the beginning, I was literally the only staff of this project. However, as time goes by, people started to gather in order to cheer you up and finally made this project become large. People from Spain, Germany and countries in east Asia have gave me countless helps so far. Probably people all around the world will gradually become willing to give you a hand once you show your passion and determination.\n\n\
                                            It must be the same being a Vtuber, managing expectations from so many people, and making so many happy.\n\n\
                                            All participants of this project are moved by Haato-sama’s great efforts and came to support you! As we all can tell, your persistence and hard work make you the world-wide strongest idol without doubt!\n\n\
                                            We have the second stage of our project so please look forward to it! We love you, Haato-sama!",
                                            orig_msg: "はあと様へ\n\n\
                                            私は今回の企画の主催者、シエウエイユエンと申します。\n\n\
                                            メンバーシップの参加は僅かの一ヶ月けど、毎回あなたが真剣に配信を準備し、企画を考える姿を見る度に、自然にこの子を応援したい気持ちになる。気づいたら、もうこの子のために本気で泣いたり笑ったり、どうしよも無くあなたの事が好きになっちゃった。\n\n\
                                            この企画の最初は、スタッフは本当に私一人しかないけど、みんながはあと様のためにだんだん集まって団結し、企画を大きくなりました！今の私はスペイン、ドイツと東アジアの人たちから助けてもらって、順調に企画を進んでいる。多分、人が何かのために、自分の全てを尽くし、真剣に努力すれば、周りだけじゃなく、世界中の人たちは必ずその情熱に応えて、支えてくれはず。\n\n\
                                            きっと、Vtuberになる事も同じだと思います。\n\n\
                                            この企画を参加する人たちはみんな、はあと様の努力に感動されて、応援しに来たのだ。頑張り屋さんのはあと様は、紛れもなくワールドワイドな最強アイドルです！\n\n\
                                            この企画にはまだ第二段階があるので、是非お楽しみにしてください！はあと様、愛しています！",
                                            country: "(East Asia)", username: "Hsieh", }} cardStyleNum={1} language={language} />
                                    </div>
                                    );
                                }
                            }
                        </LanguageContext.Consumer>
                    </div>
                    {this.renderCardSection(comboCardData)}
                    <div className="justify-center">
                        <div className="notice-container">
                            <div className="notice-content">
                                <p>These are all the messages we managed to collect!</p>
                                <p>Welcome back, Haato. おかえり、はあと。</p>
                                <p style={{fontSize: 12}}>If you find any problems with the website, or if you would like to report a message, please contact us at manotomo@googlegroups.com</p>
                            </div>
                        </div>
                    </div>
                    <div style={{height: "25px"}}/>
                    <AltNav />
                </div>
                <div style={{height: "25px"}}/>
            </section>
        )
    }
}
