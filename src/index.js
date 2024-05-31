import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const initialProps = window.__INITIAL_PROPS__ || {};

ReactDOM.hydrate(
  <BrowserRouter>
    <App {...initialProps} />
  </BrowserRouter>,
  document.getElementById('root')
);