import { Component } from 'react';
import '../../shared/globalStyles/global.css';
import './header.css';

import Aqua_header from '../../assets/backgrounds/Aqua-Header-by-roguedono.png'

interface HeaderState {
}

interface HeaderProps {

}

export default class HeaderSection extends Component<HeaderProps, HeaderState>
{
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return (
            <header id="header" className="app-header">
                <img src={Aqua_header} className="headerArt" />
            </header>
        )
    }
}
