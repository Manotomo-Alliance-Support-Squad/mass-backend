import React from 'react'
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import InfoIcon from '@material-ui/icons/Info';
import LanguageSwitchButton from '../languageSwitch/languageSwitch';

import './navbar.css';

export default function ButtonAppBar() {
    return (
        <header className="navbar">
            <div className="title">Have a Very Holo Valentine &lt;3</div>
            <div className="icons">
                {[
                    {
                        externalLink: false,
                        link: '/home',
                        altText: "Home",
                        iconFunc: () => <HomeIcon/>
                    },
                    {
                        externalLink: true,
                        link: 'https://github.com/Manotomo-Alliance-Support-Squad/holo-valentine-2021',
                        altText: "github",
                        iconFunc: () => <InfoIcon/>
                    },
                ].map((obj, idx) => {
                    // For accessibility purposes
                    let buttonAltText = (obj.altText ?? "");
                    if (obj.externalLink) {
                        return (
                            <IconButton target="_blank" rel="noopener noreferrer" href={obj.link}
                                key={idx} className="button inactive-page-icon" aria-label={buttonAltText}
                            >
                                {obj.iconFunc()}
                            </IconButton>
                        );
                    } else {
                        return (
                            <NavLink key={idx} to={obj.link} className='inactive-page-icon' activeClassName='active-page-icon'>
                                <IconButton key={idx} className="button" aria-label={buttonAltText}>
                                    {obj.iconFunc()}
                                </IconButton>
                            </NavLink>
                        );
                    }
                })}
                <LanguageSwitchButton/>
            </div>
        </header>
    );
}
