import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import yetiApp from './redux/reducers'
import {Provider} from "react-redux";

import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

// Bootstrap StyleSheet
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css';

const persistConfig = {
  key: "root",
  storage
};
const rootReducer = persistReducer(persistConfig, yetiApp);
const store = createStore(rootReducer, undefined);
const persistor = persistStore(store, {});

render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading from Cookies....</div>} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
