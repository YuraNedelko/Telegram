import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  HashRouter as Router, Switch, Route,
} from 'react-router-dom';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import ErrorBoundary from './ErrorBoundary';
import Login from './LoginComponent';
import NavbarComponent from './NavbarComponent';
// import Main from './MainComponent';
import UserReducer from '../reducers/UserReducer';
import ContactsReducer from '../reducers/ContactsReducer';
import MessagesReducer from '../reducers/MessagesReducer';

const combinedReducer = combineReducers({ user: UserReducer, contacts: ContactsReducer, messages: MessagesReducer });
const persistConfig = {
  key: 'frontend',
  storage,
};

const Main = lazy(() => import(/* webpackChunkName: "MainComponent" */ './MainComponent'));

const persistedReducer = persistReducer(persistConfig, combinedReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('react-container')) {
    ReactDOM.render(
      <ErrorBoundary>
        <NavbarComponent />
        <Router>
          <Provider store={store}>
            <PersistGate loading={<div>Loading ...</div>} persistor={persistor}>
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>
                <Route exact path="/main">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Main />
                  </Suspense>
                </Route>
              </Switch>
            </PersistGate>
          </Provider>
        </Router>
      </ErrorBoundary>, document.getElementById('react-container'),
    );
  }
});
