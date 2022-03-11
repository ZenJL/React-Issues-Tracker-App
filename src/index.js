import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { IssueProvider } from './context/issueContext';

ReactDOM.render(
  <IssueProvider>
    <App />
  </IssueProvider>,
  document.getElementById('root')
);

reportWebVitals();
