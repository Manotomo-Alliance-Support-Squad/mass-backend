import React from 'react';
import seedrandom from 'seedrandom';
import ComboSection from '../../components/comboSection/comboSection';
import {Message} from "../../models/message";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {Announcement} from "../../models/announcement"
import {Artwork, MultiArtwork} from "../../models/artwork"
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
    multiArtworks: MultiArtwork[];
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
        multiArtworks: [],
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

        // Gallery with multiple images
        const cachedMultiGallery: MultiArtwork[] | null = SessionService.getMultiGallery();
        if (cachedMultiGallery && cachedMultiGallery.length) {
            this.setState({multiArtworks: cachedMultiGallery});
        } else {
            this.manoAloeService.getMultiGallery()
                .then((multiArtworks: MultiArtwork[]) => {
                    SessionService.saveMultiGallery(multiArtworks);
                    this.setState({multiArtworks});
                })
                .catch((error: Error) => {
                    console.error(error);
                })
        }
    }

    renderCardSection(data: (Message|Artwork|Video|MultiArtwork)[]) {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.messageLoaded && this.state.announcementLoaded ? <ComboSection data={data}/> : <div/>}
                </div>
            </div>
        )
    }

    randomizeArrayWithSeed(unshuffled_arr: any[], seed: string) {
        let rng = seedrandom(seed);
        // Schwartzian transform
        return unshuffled_arr
            .map((a) => ({sort: rng(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
    }

    // We do this because state setting is async and trying to create this in getData yields empty arrays
    compileCardData() {
        let comboCardData: (Message|Artwork|Video|MultiArtwork)[] = [];
        let mainContentArray: any[] = [];
        let subContentArray: any[] = [];
        let multimediaCount: number = this.state.artworks.length + this.state.videos.length + this.state.multiArtworks.length;
        let indexIncrementSpacing: number;
        
        // The higher count of the two types of content gets to determine the sprinkling of the type of content
        if (multimediaCount > this.state.messages.length) {
            mainContentArray = this.randomizeArrayWithSeed(
                mainContentArray.concat(this.state.multiArtworks, this.state.artworks, this.state.videos),
                "manotomo",
            );
            // TODO: create a randomly seeded version of the main content array
            subContentArray = this.state.messages;
            
            indexIncrementSpacing = Math.floor(multimediaCount / this.state.messages.length);
        } else {
            mainContentArray = this.state.messages;
            subContentArray = this.randomizeArrayWithSeed(
                subContentArray.concat(this.state.multiArtworks, this.state.artworks, this.state.videos),
                "manotomo",
            );
            if (multimediaCount === 0) {
                indexIncrementSpacing = -1;

            } else {
                indexIncrementSpacing = Math.floor(this.state.messages.length / multimediaCount);
            }
        }

        // Main content is the type of content we have more of
        for (
                let mainContentIndex = 0, subContentIndex = 0;
                mainContentIndex < mainContentArray.length;
                mainContentIndex++) {
            comboCardData.push(mainContentArray[mainContentIndex]);

            if indexIncrementSpacing === -1 {
                continue;
            }
            else if (mainContentIndex % indexIncrementSpacing === 0 && subContentIndex < subContentArray.length) {
                comboCardData.push(subContentArray[subContentIndex]);
                subContentIndex++;
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
                    <div className="separator">
                        <AnchorLink offset='120' href='#message-anchor'>
                            <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                        </AnchorLink>
                    </div>
                    <div id="message-anchor" className="justify-center">
                        <div className="justify-align-center">
                            <AnnouncementSection data={this.state.announcements} customSectionStyle="single-column notice-container wrapper-overlay"/>
                        </div>
                    </div>
                    <div className="justify-center padding-top">
                        <LanguageContext.Consumer>
                            {(value: LanguageContextValue) => {
                                const {language} = value;
                                return (
                                    <div className="justify-align-center notice-container wrapper-overlay" style={{"whiteSpace": "pre-line"}}>
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
                                            country: "(East Asia)", username: "Hsieh", }} cardStyleIndex={1} language={language} />
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
