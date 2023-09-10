import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import Timeline from './Timeline';
import Profile from './Profile'
import Divider from './Divider'
import OfficialOutputs from './OfficialOutput';
import TrainingPrograms from './TrainingPrograms';
import reportWebVitals from './reportWebVitals';
import { textAlign } from '@mui/system';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Profile />
    <Header title="Career" />
    <Timeline />
    <Divider />
    <Header title="Outputs" />
    <OfficialOutputs />
    <Divider />
    <Header title="Training Programs" />
    <TrainingPrograms />
    <div style={{ padding: '5%' }}></div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
