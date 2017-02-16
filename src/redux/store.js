'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import config from './reducers/config';
import docs from './reducers/docs';
import editor from './reducers/editor';

const logger = reduxLogger();

let createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

export default createStoreWithMiddleware(combineReducers({ config, docs, editor }));
