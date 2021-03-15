import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import React, {Component} from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import './inPageNav.css';
import '../../shared/globalStyles/global.css';


interface InPageNavState{
}

interface InPageNavProps{
    navButtons: Array<Object>;
}

const NavButton = withStyles({
      containedPrimary: {
        color: "#ffffff",
        backgroundColor: "#f45787",
        '&:hover': {
          backgroundColor: "#d01760",
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
            <div className="in-page-nav-container">
                {this.navButtons.map((obj, idx) => {
                    if (Object(obj)["link"].startsWith("http")) {
                        return (
                            <a target="_blank" rel="noopener noreferrer" href={Object(obj)["link"]}>
                                <NavButton variant="contained" startIcon={Object(obj)["startIcon"]} size="large" color="primary">
                                    {Object(obj)["buttonContent"]}
                                </NavButton>
                            </a>
                        );
                    } else {
                        return (
                            <NavLink to={Object(obj)["link"]}>
                                <NavButton variant="contained" startIcon={Object(obj)["startIcon"]} size="large" color="primary">
                                    {Object(obj)["buttonContent"]}
                                </NavButton>
                            </NavLink>
                        );
                    }
                })}
            </div>
        );
    }

    render() {
        return this.buildNavRender();
    }

}
