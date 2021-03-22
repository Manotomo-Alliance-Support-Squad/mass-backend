import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import InPageNav from '../inPageNav/inPageNav';
import '../../shared/globalStyles/global.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

import MessageCard from '../messageSection/messageCard/messageCard';
import { LanguageContext, LanguageContextValue } from '../languageSwitch/languageContext';

import './header.css';

interface HeaderState {
}

interface HeaderProps {
}


export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps)
    {
        super(props);
    }

    renderDefaultSection(): JSX.Element
    {
        return (
            <header className="app-header">
                <div className="header-top">
                    <p>We all miss your smiling presence and your voice that warm our hearts</p>
                </div>
                <div className="header-bottom">
                    <p>Cant' wait to have you back, we all love you so much, Akai Haato/Haachama</p>
                </div>
            </header>
       )
    }

    render() {
        return this.renderDefaultSection();
    }
}
