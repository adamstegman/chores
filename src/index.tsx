import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './core/app';

const domContainer = document.querySelector('#root');
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  domContainer,
);
