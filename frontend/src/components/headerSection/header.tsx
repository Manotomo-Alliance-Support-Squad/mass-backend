import { Component } from 'react';
import '../../shared/globalStyles/global.css';
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
                    <p>Can't wait to have you back, we all love you so much, Akai Haato/Haachama</p>
                </div>
            </header>
       )
    }

    render() {
        return this.renderDefaultSection();
    }
}
