import { Component } from 'react';
import '../../shared/globalStyles/global.css';
import './footer.css';

interface FooterState {
}

interface FooterProps {

}

export default class FooterSection extends Component<FooterProps, FooterState>
{
    constructor(props: FooterProps) {
        super(props);
    }

    render() {
        return (
            <div className="app-footer">
            </div>
        )
    }
}
