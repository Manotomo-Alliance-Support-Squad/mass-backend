import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';
import InPageNav from '../inPageNav/inPageNav';
import '../../shared/globalStyles/global.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

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
                <div className="community-message-card">
                    <h1 className="community-message-header">For Everyone At Hololive</h1>
                    <div className="community-message-body">
                        <p>We have collected Valentine messages from your fans across the world. Thanks for all the entertainment all of you have provided, in the past, and yet to come.</p>
                        <p>Happy Valentines day &lt;3</p>
                    </div>
                </div>
                <div style={{height: 50}}/>
                <AltNav />
                <div style={{height: 50}}/>
            </header>
       )
    }

    render() {
        return this.renderDefaultSection();
    }
}
