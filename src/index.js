import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import ReactGA from 'react-ga4';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Google Analytics 測定 ID を入力して設定
ReactGA.initialize("G-ZTPNRX81R0");

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
