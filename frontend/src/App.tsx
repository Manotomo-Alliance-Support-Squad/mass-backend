import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import ButtonAppBar from './components/navigation/navbar';
import './App.css';

import SessionService from "./services/session.service";
import {LanguageContext, LanguageContextValue} from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

import HeaderSection from "./components/headerSection/header"
import YogiriPage from './pages/yogiri/yogiri';
import CiviaPage from './pages/civia/civia';
import ArtiaPage from './pages/artia/artia';
import DorisPage from './pages/doris/doris';
import RosalynPage from './pages/rosalyn/rosalyn';
import SpadeEchoPage from './pages/spade_echo/spade_echo';

const HomePage = lazy(() => import('./pages/home/home'));
const GamePage = lazy(() => import('./pages/game/game'));
const ArtPage = lazy(() => import('./pages/gallery/art'));

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
                <main className="main">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path='/'>
                                <Redirect to="/home" />
                            </Route>

                            <Route path='/yogiri' component={YogiriPage}/>
                            <Route path='/civia' component={CiviaPage}/>
                            <Route path='/artia' component={ArtiaPage}/>
                            <Route path='/doris' component={DorisPage}/>
                            <Route path='/rosalyn' component={RosalynPage}/>
                            <Route path='/spade_echo' component={SpadeEchoPage}/>

                            <Route path='/home' component={HomePage}/>
                            <Route path='/game' component={GamePage}/>
                            <Route path='/art' component={ArtPage}/>
                        </Switch>
                    </Suspense>
                </main>
            </LanguageContext.Provider>
        );
    }
}
