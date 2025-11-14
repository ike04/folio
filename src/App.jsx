import React from 'react';
import { useEffect } from "react";
import './index.css';
import Header from './component/Header';
import Title from './component/Title';
import Timeline from './component/Timeline';
import Profile from './component/Profile'
import OfficialOutputs from './component/OfficialOutput';
import Skills from './component/Skills';
import Footer from './component/Footer';
import ReactGA from 'react-ga4';
import Toolbar from '@mui/material/Toolbar';

export default function App() {
    useEffect(() => {
        // ページビューイベントを処理
        ReactGA.send({
            hitType: "pageview",
            page: "App.jsx"
        });
    }, []);

    return (<>
        <Header />
        <Toolbar />
        <Profile />
        <Title title="Skills" />
        <Skills />
        <Title title="Career" />
        <Timeline />
        <Title title="Outputs" />
        <OfficialOutputs />
        <Footer />
    </>
    )
}