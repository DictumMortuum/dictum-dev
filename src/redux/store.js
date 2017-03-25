'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import reduxLogger from 'redux-logger';
import thunk from 'redux-thunk';
import config from './reducers/config';
import docs from './reducers/docs';
import editor from './reducers/editor';
import date from './reducers/date';
import length from './reducers/length';
// import tags from './reducers/tags';
import info from './reducers/info';
import filter from './reducers/filter';

const logger = reduxLogger();

let createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

export default createStoreWithMiddleware(combineReducers({
  config,
  docs,
  editor,
  date,
  length,
  info,
  filter
}));
