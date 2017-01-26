'use strict';

import { regex } from '../db';

function _fetch(records) {
  if (!records) {
    return [];
  }

  return records.rows
    // filter out configuration docs
    .filter(doc => regex.test(doc.key))
    // regex.test(doc.key))
    // remove couch stuff
    .map(r => r.doc);
    // make into associative array
    /*
    .reduce((acc, cur) => {
      acc[cur._id] = cur;
      return acc;
    }, {});
    */
}

export default (state=[], action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return _fetch(action.docs);
  case 'DOC_DELETE':
    let temp = Object.assign({}, state);
    delete temp[action.id];
    return temp;
  case 'DOC_INSERT':
    return Object.assign({}, state, { [action.doc.id]: action.doc });
  default:
    return state;
  }
};

/*
  return state.docs.filter(doc => doc.id !== action.id);
  return [...state.docs.filter(doc => doc.id !== action.doc.id), action.doc];
*/
