import React from 'react';
import ReactDOM from 'react-dom';
import App from './features/satisfaction';
import reportWebVitals from './reportWebVitals';

import { Provider, ReactReduxContext } from 'react-redux';
import store from './config/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App context={ReactReduxContext} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
