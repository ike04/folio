import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Timeline from './Timeline';
import Profile from './Profile'
import OfficialOutputs from './OfficialOutput';
import reportWebVitals from './reportWebVitals';
import { padding, textAlign } from '@mui/system';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Profile />
    <h2 style={{ padding: '5% 0% 0% 35%' }}>Career</h2>
    <Timeline style={{margin: '5% 50% 50% 55%'}}/>
    <h2 style={{ padding: '5% 0% 0% 35%' }}>Outputs</h2>
    <OfficialOutputs />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
