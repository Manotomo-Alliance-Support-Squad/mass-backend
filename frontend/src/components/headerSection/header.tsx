import { Component } from 'react';
import '../../shared/globalStyles/global.css';
import './header.css';

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
            <header className="app-header">
            </header>
        )
    }
}
