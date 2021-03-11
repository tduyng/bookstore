import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HelmetProvider } from 'react-helmet-async';
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import './assets/styles/css/style.css';
import { PersistGate } from 'redux-persist/integration/react';
import ReactLoading from 'react-loading';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={<ReactLoading type="bars" height={'20%'} width={'20%'} color="#666" />}
      persistor={persistor}
    >
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
