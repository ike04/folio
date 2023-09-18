import React from 'react';
import { useEffect } from "react";
import './index.css';
import Header from './component/Header';
import Title from './component/Title';
import Timeline from './component/Timeline';
import Profile from './component/Profile'
import Divider from './component/Divider'
import OfficialOutputs from './component/OfficialOutput';
import TrainingPrograms from './component/TrainingPrograms';
import ReactGA from 'react-ga4';

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
        <Profile />
        <Title title="Career" />
        <Timeline />
        <Divider />
        <Title title="Outputs" />
        <OfficialOutputs />
        <Divider />
        <Title title="Training Programs" />
        <TrainingPrograms />
        <div style={{ padding: '5%' }}></div>
    </>
    )
}