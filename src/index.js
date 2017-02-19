import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App.jsx';
import './css/index.css';
import {setApiKey, loadApiKey} from './js/model';
import {getCookie} from './js/helpers';

//Try to load API key from cookie. If there isn't any api key in cookies, It will request for a new API key.
const apiKey = getCookie('apikey');
if (apiKey) {
  setApiKey(apiKey);
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
} else {
  loadApiKey().then(() => {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
  });
}



