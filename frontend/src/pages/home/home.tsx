import React from 'react';
import seedrandom from 'seedrandom';
import ComboSection from '../../components/comboSection/comboSection';
import { Message } from "../../models/message";
import ManoAloeService from "../../controllers/mano-aloe.service";
import SessionService from "../../services/session.service";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import { Announcement } from "../../models/announcement"
import { Artwork, MultiArtwork } from "../../models/artwork"
import { Video } from "../../models/video"
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
    multiArtworks: MultiArtwork[];
    videos: Video[];
}

export default class HomePage extends React.Component<HomePageProps, HomePageState> {

    constructor(props: HomePageProps,
        private manoAloeService: ManoAloeService) {
        super(props);
        this.manoAloeService = new ManoAloeService();
        this.loadVideo = this.loadVideo.bind(this);
        this.loadArtwork = this.loadArtwork.bind(this);
        this.loadAnnouncements = this.loadAnnouncements.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
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
        this.loadMessages()
        this.loadAnnouncements();
        this.loadArtwork();
        this.loadVideo();
    }

    async loadMessages() {
        const setMessagesToState = (messages: Message[]) => this.setState({ messages, messageLoaded: true });
        const getMessagesFromService = () => this.manoAloeService.getAllMessages()
            .then(setMessagesToState)
            .catch(console.error);

        const messages = SessionService.getMessages() ?? [];
        if (messages?.length) {
            setMessagesToState(messages);
        } else {
            getMessagesFromService().finally(
                () => SessionService.saveMessages(this.state.messages)
            );
        }
    }

    async loadAnnouncements() {
        const setAnnouncementsToState = (announcements: Announcement[]) => this.setState({ announcements, announcementLoaded: true });
        this.manoAloeService.getAllAnnouncements()
            .then(setAnnouncementsToState)
            .catch(console.error);
    }

    async loadVideo() {
        const setVideosToState = (videos: Video[]) => this.setState({ videos });
        const getVideoFromService = () => this.manoAloeService.getVideo()
            .then(setVideosToState)
            .catch(console.error);

        const videos = SessionService.getVideo() ?? [];
        if (videos?.length) {
            setVideosToState(videos);
        } else {
            getVideoFromService().finally(
                () => SessionService.saveVideo(this.state.videos)
            );
        }
    }


    async loadArtwork() {
        const setArtworksToState = (artworks: Artwork[]) => this.setState({ artloading: false, artworks });
        const getArtworkFromService = () => this.manoAloeService.getGallery()
            .then(setArtworksToState)
            .catch(console.error);

        const artworks = SessionService.getGallery() ?? [];
        if (artworks?.length) {
            setArtworksToState(artworks);
        } else {
            getArtworkFromService().finally(
                () => SessionService.saveGallery(this.state.artworks)
            );
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

    renderCardSection(data: (Message | Artwork | Video | MultiArtwork)[]) {
        return (
            <div>
                <div className="wrapper-overlay">
                    {this.state.messageLoaded && this.state.announcementLoaded ? <ComboSection data={data} /> : <div />}
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
                "manotomo",  // seed to get the same randomization results every time
            );
            // TODO: create a randomly seeded version of the main content array
            subContentArray = this.state.messages;
            
            indexIncrementSpacing = Math.floor(multimediaCount / this.state.messages.length);
        } else {
            mainContentArray = this.state.messages;
            subContentArray = this.randomizeArrayWithSeed(
                subContentArray.concat(this.state.multiArtworks, this.state.artworks, this.state.videos),
                "manotomo",  // seed to get the same randomization results every time
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

            if (indexIncrementSpacing === -1) {
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
                    <div id="video-anchor" className="main-video-container">
                        <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/Snn2gWq-3KY" title="YouTube video player" frameBorder="0"></iframe>
                    </div>
                    <div className="separator">
                        <AnchorLink offset='120' href='#message-anchor'>
                            <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{ width: 36, height: 36 }} />
                        </AnchorLink>
                    </div>
                    <div id="message-anchor" className="justify-center">
                        <div className="justify-align-center">
                            <AnnouncementSection data={this.state.announcements} customSectionStyle="single-column notice-container wrapper-overlay" />
                        </div>
                    </div>
                    <div className="justify-center padding-top">
                        <LanguageContext.Consumer>
                            {(value: LanguageContextValue) => {
                                const { language } = value;
                                return (
                                    <div className="justify-align-center notice-container" style={{"whiteSpace": "pre-line"}}>
                                        <MessageCard key={1} object={{ messageID: 0,
                                            orig_msg: "あくあたんおかえりなさい！ 私たちはあくあクルーの代表として、あなたのための支援プロジェクトを用意しています。小さなプロジェクトでも、あくたんが私たちがここにいることを覚えておいてください. \n\n\
                                            私たちはあくたんのおかえりを嬉しく思います。そして、あくたん の歌の配信を楽しみにしています。",
                                            tl_msg: "We are some representatives of the Aqua Crew, and we have prepared a support project for you! It's not much, but we hope Aqutan remembers that we’re here cheering you up no matter what happens~ \n\n\
                                            We are happy for your return and we will be looking forward for Aqutan’s streams!\n\n\
                                            Welcome back, Aqua!\
                                            ",
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
                                <p style={{fontSize: 12}}>If you find any problems with the website, or if you would like to report a message, please contact us at manotomo@googlegroups.com or at webmaster@manotomo.com</p>
                                <p style={{fontSize: 12}}>This is not an official Hololive site. We are just a group of fans</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
