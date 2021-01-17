import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import React, {Component} from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import './inPageNav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../shared/globalStyles/global.css';
import Carousel from 'react-bootstrap/Carousel';


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
