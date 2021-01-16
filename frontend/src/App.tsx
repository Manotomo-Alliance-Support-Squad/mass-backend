import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import ButtonAppBar from './components/navigation/navbar';
import './App.css';

import SessionService from "./services/session.service";
import {LanguageContext, LanguageContextValue} from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

import './shared/globalStyles/global.css';

import HeaderSection from "./components/headerSection/header"
import YogiriPage from './pages/yogiri/yogiri';
import CiviaPage from './pages/civia/civia';
import ArtiaPage from './pages/artia/artia';
import DorisPage from './pages/doris/doris';
import RosalynPage from './pages/rosalyn/rosalyn';
import SpadeEchoPage from './pages/spade_echo/spade_echo';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

interface AppProps {
}

export default class App extends React.Component<AppProps, LanguageContextValue> {

    state: LanguageContextValue = {
        language: DisplayedLanguage.Original,
        toggleLanguage: () => {
            const {language} = this.state;
            const nextLanguage = language === DisplayedLanguage.Original ? DisplayedLanguage.Japanese : DisplayedLanguage.Original;

            this.setState({language: nextLanguage});
            SessionService.saveLanguage(nextLanguage);
        }
    };

    componentDidMount() {
        if (SessionService.getLanguage() === null) {
            SessionService.saveLanguage(DisplayedLanguage.Original);
        }
        this.setState({language: SessionService.getLanguage() as DisplayedLanguage});
    }

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <ButtonAppBar />
                <HeaderSection />
            </LanguageContext.Provider>
        );
    }
}
