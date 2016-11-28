import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import { Provider } from 'react-redux';
import store from './store';
import socket from './model/DAL/socket/app';
socket(store);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
