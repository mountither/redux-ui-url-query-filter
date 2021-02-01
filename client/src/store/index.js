import { applyMiddleware, compose, createStore } from "redux";
import {  routerMiddleware } from "connected-react-router";
import {  createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import mySaga from '../saga'
import middleware from '../middleware'
import rootReducer from '../reducers'


const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer(history),
composeEnhancers(applyMiddleware(sagaMiddleware, middleware, routerMiddleware(history))));

sagaMiddleware.run(mySaga);

store.dispatch({type:"INIT_PRODUCTS"});


export default store;