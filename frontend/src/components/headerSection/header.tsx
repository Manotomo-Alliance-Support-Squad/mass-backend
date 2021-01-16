import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';
import InPageNav from '../inPageNav/inPageNav';
import '../../shared/globalStyles/global.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import yogiri from '../../assets/sprites/yogiri.webp'
import civia from '../../assets/sprites/civia.webp'
import spade_echo from '../../assets/sprites/spade_echo.webp'
import doris from '../../assets/sprites/doris.webp'
import artia from '../../assets/sprites/artia.webp'
import rosalyn from '../../assets/sprites/rosalyn.webp'


import './header.css'

interface HeaderState {
}

interface HeaderProps {
}

// FIXME: Images below hard coded as 300px in inPageNav.css
const headerNav = [
    {
        link: "/yogiri",
        buttonContent: <div className="slide-content"><img src="https://u.cubeupload.com/zapple/yogiri.jpg"/>Yogiri</div>,
        page: <YogiriPage/>,
        startIcon: ""
    },
    {
        link: "/civia",
        buttonContent: <div className="slide-content"><img src="https://u.cubeupload.com/zapple/civia.jpg"/>Civia</div>,
        page: <CiviaPage/>,
        startIcon: ""
    },
    {
        link: "/spade_echo",
        buttonContent: <div className="slide-content"><img src="https://u.cubeupload.com/zapple/spadeecho.jpg"/>Spade Echo</div>,
        page: <SpadeEchoPage/>,
        startIcon: ""
    },
    {
        link: "/doris",
        buttonContent: <div className="slide-content"><img src="https://u.cubeupload.com/zapple/doris.jpg"/>Doris</div>,
        page: <DorisPage/>,
        startIcon: ""
    },
    {
        link: "/artia",
        buttonContent: <div className="slide-content"><img src="https://u.cubeupload.com/zapple/artia.jpg"/>Artia</div>,
        page: <ArtiaPage/>,
        startIcon: ""
    },
    {
        link: "/rosalyn",
        buttonContent: <div className="slide-content"><img src="https://u.cubeupload.com/zapple/rosalyn.jpg"/>Rosalyn</div>,
        page: <RosalynPage/>,
        startIcon: ""
    },
]

export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    renderDefaultSection(): JSX.Element {
        return (
            <>
                <header className="App-header">
                    <div style={{height: 50}}/>
                    <InPageNav navButtons={headerNav}/>
                </header>
                <div className="separator"/>
            </>
        )
    }

    render() {
        return this.renderDefaultSection();
    }
}
