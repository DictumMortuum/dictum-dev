'use strict';

import { regex } from '../db';

function _fetch(records) {
  if (!records) {
    return {};
  }

  return records.rows
    .filter(doc => regex.match(doc.key)); /* filter out configuration docs */
    .map(r => r.doc)                      /* remove couch stuff */
    .reduce((acc, cur) => {               /* make into associative array */
      acc[cur.key] = cur;
      return acc;
    }, {});
}

export default (state={}, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return _fetch(action.docs);
  case 'DOC_DELETE':
    var temp = Object.assign({}, state);
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
