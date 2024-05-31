import React from 'react';
import ReactDOM from 'react-dom';
// Remove BrowserRouter import
import App from './App';

const initialProps = window.__INITIAL_PROPS__ || {};

ReactDOM.hydrate(
  <BrowserRouter>
    <App {...initialProps} />
  </BrowserRouter>,
  document.getElementById('root')
);
