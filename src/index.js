import React from 'react';
import ReactDOM from 'react-dom';
// Remove BrowserRouter import
import App from './App';

const initialProps = window.__INITIAL_PROPS__ || {};

ReactDOM.hydrate(
  <App {...initialProps} />,
  document.getElementById('root')
);
