import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const reducer = (state = {}, action) => {
    return state;
};

const store = createStore(
    reducer,
    undefined,
    applyMiddleware(
        apiMiddleware,
        reduxThunk,
        logger,
    )
);

window.store = store;

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
