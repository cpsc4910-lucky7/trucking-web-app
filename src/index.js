import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProvideAuth } from './use-auth';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProvideAuth>
    <App />
  </ProvideAuth>
);
