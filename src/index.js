import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Timeline from './Timeline';
import Profile from './Profile'
import OfficialOutputs from './OfficialOutput';
import TrainingPrograms from './TrainingPrograms';
import reportWebVitals from './reportWebVitals';
import { textAlign } from '@mui/system';
import Divider from '@mui/material/Divider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Profile />
    <h2 style={{ padding: '5% 0% 0% 0%', textAlign: 'center' }}>Career</h2>
    <Timeline />
    <Divider variant="middle"/>
    <h2 style={{ padding: '5% 0% 0% 0%', textAlign: 'center' }}>Outputs</h2>
    <OfficialOutputs />
    <Divider variant="middle"/>
    <h2 style={{ padding: '5% 0% 0% 0%', textAlign: 'center' }}>Training Programs</h2>
    <TrainingPrograms />
    <div style={{padding: '5%'}}></div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
