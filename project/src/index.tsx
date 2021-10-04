import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const enum Param {
  OffersCount = 5
}

ReactDOM.render(
  <React.StrictMode>
    <App offersCount={Param.OffersCount} />
  </React.StrictMode>,
  document.getElementById('root'),
);
