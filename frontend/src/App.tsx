import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import ButtonAppBar from './components/navigation/navbar';
import './App.css';

import SessionService from "./services/session.service";
import { LanguageContext, LanguageContextValue } from "./components/languageSwitch/languageContext";
import DisplayedLanguage from "./models/language";

import HeaderSection from "./components/headerSection/header";
import FooterSection from "./components/footerSection/footer";

import HomePage from './pages/home/home';
import AltNav from './components/navigation/altnav';
import AnchorSingleSection from "./components/anchor/anchorSingleSection";
import { AnchorSectionPosition } from "./models/achor";
import { ReactComponent as AnchorBotan } from "./assets/icons/anchorIcon.svg";

interface AppProps {
}

export default class App extends React.Component<AppProps, LanguageContextValue> {

    state: LanguageContextValue = {
        language: DisplayedLanguage.Original,
        toggleLanguage: () => {
            const { language } = this.state;
            const nextLanguage = language === DisplayedLanguage.Original ? DisplayedLanguage.Japanese : DisplayedLanguage.Original;

            this.setState({ language: nextLanguage });
            SessionService.saveLanguage(nextLanguage);
        }
    };

    componentDidMount() {
        if (SessionService.getLanguage() === null) {
            SessionService.saveLanguage(DisplayedLanguage.Original);
        }
        this.setState({ language: SessionService.getLanguage() as DisplayedLanguage });
    }

    render() {
        return (
            <LanguageContext.Provider value={this.state}>
                <HeaderSection />
                <ButtonAppBar />
                <main className="main">
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to="/home" />
                        </Route>
                        <Route path='/home' component={HomePage} />
                    </Switch>
                </main>
                <div style={{ height: "25px" }} />
                <AltNav />
                <FooterSection />
                <AnchorSingleSection position={AnchorSectionPosition.BOTTOM_RIGHT} anchor={{
                    href: "#header",
                    svgIcon: AnchorBotan, //TODO: replace this with aqua onion
                    text: null,
                }} />
            </LanguageContext.Provider>
        );
    }
}
