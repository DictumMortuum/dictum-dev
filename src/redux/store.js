'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import config from './reducers/config';
import docs from './reducers/docs';
import editor from './reducers/editor';
import date from './reducers/date';
import length from './reducers/length';
// import tags from './reducers/tags';
import info from './reducers/info';
import filter from './reducers/filter';
import search from './reducers/search';
import type from './reducers/type';
import toggle from './reducers/toggle';
import db from './db';

let createStoreWithMiddleware = applyMiddleware(thunk, promise, createLogger())(createStore);

export default createStoreWithMiddleware(combineReducers({
  config,
  docs,
  editor,
  date,
  length,
  info,
  filter,
  search,
  type,
  db,
  toggle
}));
