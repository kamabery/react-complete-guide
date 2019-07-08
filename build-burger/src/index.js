import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

import thunk from 'redux-thunk';

const logger = store => next => action => {
    console.log('[Middleware] Disaptching:', action);
    const result = next(action);
    console.log('[Middleware] next state', store.getState());
    return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootreducer = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer
})

// const rootreducer = burgerReducer;

const store = createStore(rootreducer, 
    composeEnhancers(applyMiddleware(thunk, logger)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
