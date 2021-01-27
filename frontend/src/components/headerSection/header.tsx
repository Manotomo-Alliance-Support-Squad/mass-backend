import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';
import InPageNav from '../inPageNav/inPageNav';
import '../../shared/globalStyles/global.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import InfoIcon from '@material-ui/icons/Info';

import './header.css';

interface HeaderState {
}

interface HeaderProps {
}

const headerNav = [
    {
        link: "/game",
        buttonContent: "Games",
        page: "",
        startIcon: <SportsEsportsIcon />
    },
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
            <>
                <header className="App-header">
                    <div className="community-message-card">
                        <h1 className="community-message-header">A Community Message for Aloe</h1>
                        <div className="community-message-body">
                            <p>Dear Aloe, thank you for everything. While it may have been but for a short while, we appreciate every little thing you've given us. We wish you the best of luck going forward.</p>
                            <p>親愛なるアロエ様。短い間ではありましたが、一緒に過ごした時間に心より感謝しております。本当にありがとうございました。アロエ様のご健勝とご多幸をお祈り申し上げます。</p>
                        </div>
                    </div>
                    <div style={{height: 50}}/>
                    <InPageNav navButtons={headerNav}/>
                    <div style={{height: 50}}/>
                </header>
                <div className="separator">
                    <AnchorLink offset='120' href='#video-anchor'>
                        <ArrowDropDownCircleOutlinedIcon className="anchor-link" style={{width: 36, height:36}}/>
                    </AnchorLink>
                </div>
            </>
       )
    }

    render() {
        return this.renderDefaultSection();
    }
}
