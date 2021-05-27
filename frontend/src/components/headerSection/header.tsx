import { Component } from 'react';
import '../../shared/globalStyles/global.css';
import './header.css';

interface HeaderState {
}

interface HeaderProps {

}

const headerMessage = {
    messageTop: "We all miss your smiling presence and your voice that warm our hearts",
    messageBottom: "Can't wait to have you back, we all love you so much, Akai Haato/Haachama",
}


export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        const { messageTop, messageBottom } = headerMessage;
        return (
            <header className="app-header">
                <div className="header-top">
                    <p>{messageTop}</p>
                </div>
                <div className="header-bottom">
                    <p>{messageBottom}</p>
                </div>
            </header>
        )
    }
}
