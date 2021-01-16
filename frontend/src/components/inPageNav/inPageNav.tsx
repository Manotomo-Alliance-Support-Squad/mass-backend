import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import React, {Component} from 'react'

import YogiriPage from '../../pages/yogiri/yogiri';
import CiviaPage from '../../pages/civia/civia';
import ArtiaPage from '../../pages/artia/artia';
import DorisPage from '../../pages/doris/doris';
import RosalynPage from '../../pages/rosalyn/rosalyn';
import SpadeEchoPage from '../../pages/spade_echo/spade_echo';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import './inPageNav.css'

interface InPageNavState{
}

interface InPageNavProps{
    navButtons: Array<Object>;
}

const NavButton = withStyles({
      containedPrimary: {
        color: "#ffffff",
        backgroundColor: "#908d8d",
        '&:hover': {
          backgroundColor: "#bbbbbb",
        },
      },
})(Button);

export default class InPageNav extends Component<InPageNavProps, InPageNavState>{
    navButtons: Array<Object>;

    constructor(props: InPageNavProps)
    {
        super(props);
        this.navButtons = props.navButtons
    }

    // TODO: Uses similar style as navbar. Potentially refactor that with the common code here.
    buildNavRender() : JSX.Element {
        return (
                <Carousel className="w-100">
                    {this.navButtons.map((obj, idx) => {
                        return (
                            <Carousel.Item>
                                {Object(obj)["buttonContent"]}
                                <div className="carousel-text">
                                    {Object(obj)["page"]}
                                </div>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
        );
    }

    render() {
        return this.buildNavRender();
    }

}
