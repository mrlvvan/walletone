import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './ios-overrides.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RatesProvider } from './context/RatesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RatesProvider>
      <App />
    </RatesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
