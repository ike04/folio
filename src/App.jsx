import React from 'react';
import { useEffect } from "react";
import './index.css';
import Header from './component/Header';
import Title from './component/Title';
import Timeline from './component/Timeline';
import Profile from './component/Profile'
import OfficialOutputs from './component/OfficialOutput';
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
        <Title title="Outputs" />
        <OfficialOutputs />
        <div style={{ padding: '80px 0' }}></div>
    </>
    )
}