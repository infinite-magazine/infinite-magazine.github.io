import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, RouterProvider, createHashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

