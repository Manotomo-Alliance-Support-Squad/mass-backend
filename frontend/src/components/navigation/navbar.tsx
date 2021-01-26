import React from 'react'
import {NavLink} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import InfoIcon from '@material-ui/icons/Info';

import './navbar.css';

export default function ButtonAppBar() {
    return (
        <header className="navbar">
            <div className="title">Minna Have a Very Holo Valentine &lt;3</div>
            <div className="icons">
                {[
                    {
                        externalLink: false,
                        link: '/home',
                        altText: "Home",
                        iconFunc: () => <HomeIcon/>
                    },
                    {
                        externalLink: false,
                        link: '/game',
                        altText: "Games",
                        iconFunc: () => <SportsEsportsIcon/>
                    },
                    {
                        externalLink: true,
                        link: 'https://github.com/Manotomo-Alliance-Support-Squad/holocn-graduation',
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
            </div>
        </header>
    );
}
