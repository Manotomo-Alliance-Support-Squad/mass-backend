import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import InPageNav from '../inPageNav/inPageNav';
import '../../shared/globalStyles/global.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import MessageCard from '../messageSection/messageCard/messageCard';
//import DisplayedLanguage from '../../models/lanugage';
import { LanguageContext, LanguageContextValue } from '../languageSwitch/languageContext';

import './header.css';

interface HeaderState {
}

interface HeaderProps {
}

const AltNav = () => {
    const location = useLocation();
    if (location.pathname == "/home") {
        return <InPageNav navButtons={homeNav}/>;
    }
    return <span />
};

const homeNav = [
    {
        link: 'https://github.com/Manotomo-Alliance-Support-Squad/holo-valentine-2021',
        buttonContent: "Credits",
        page: "",
        startIcon: <InfoIcon />
    },
]

export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps)
    {
        super(props);
    }

    renderDefaultSection(): JSX.Element
    {
        return (
            <header className="App-header">
                <LanguageContext.Consumer>
                    {(value: LanguageContextValue) => {
                        const {language} = value;
                        return (
                            <div>
                                <div className="community-message-card fullwidth">
                                    <MessageCard key={1} object={{ messageID: 0, 
                                        orig_msg: "はあと様へ\n\n\
                                        私は今回の企画の主催者、シエウエイユエンと申します。\n\
                                        メンバーシップの参加は僅かの一ヶ月けど、毎回あなたが真剣に配信を準備し、企画を考える姿を見る度に、自然にこの子を応援したい気持ちになる。気づいたら、もうこの子のために本気で泣いたり笑ったり、どうしよも無くあなたの事が好きになっちゃった。\n\
                                        この企画の最初は、スタッフは本当に私一人しかないけど、みんながはあと様のためにだんだん集まって団結し、企画を大きくなりました！今の私はスペイン、ドイツと東アジアの人たちから助けてもらって、順調に企画を進んでいる。多分、人が何かのために、自分の全てを尽くし、真剣に努力すれば、周りだけじゃなく、世界中の人たちは必ずその情熱に応えて、支えてくれはず。\n\
                                        きっと、Vtuberになる事も同じだと思います。この企画を参加する人たちはみんな、はあと様の努力に感動されて、応援しに来たのだ。頑張り屋さんのはあと様は、紛れもなくワールドワイドな最強アイドルです！\n\
                                        この企画にはまだ第二段階があるので、是非お楽しみにしてください！はあと様、愛しています！",
                                        tl_msg: "To Haato-sama,\n\n\
                                        I am the initiator of this project, W.Y. Hsieh. \
                                        Although I have been joining your membership for only a month, every time I see you fully engaged in streams and plans, I couldn’t help but feel encouraged by your strong passion. Without consciousness, I eventually started to cry for your touching moments and feel truly-warmed when you look happy. \
                                        At the beginning, I was literally the only staff of this project. However, as time goes by, people started to gather in order to cheer you up and finally made this project become large. People from Spain, Germany and countries in east Asia have gave me countless helps so far. Probably people all around the world will gradually become willing to give you a hand once you show your passion and determination. \
                                        I believe it is also the same as a Vtuber. All participants of this project are moved by Haato-sama’s great efforts and came to support you! As we all can tell, your persistence and hard work make you the world-wide strongest idol without doubt!\
                                        We have the second stage of our project so please look forward to it! We love you, Haato-sama!", 
                                        country: "TW", username: "Hsieh", }} cardStyleNum={1} language={language} />
                                </div>
                                <div style={{height: 50}}/>
                                <AltNav />
                                <div style={{height: 50}}/>
                            </div>
                            );
                        }
                    }
                </LanguageContext.Consumer>
            </header>
       )
    }

    render() {
        return this.renderDefaultSection();
    }
}
