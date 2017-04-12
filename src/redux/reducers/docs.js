'use strict';

import { sort, strip } from '../db';

const defaultState = [];

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return action.docs;
  case 'DOC_DELETE':
    return state.filter(d => d._id !== action.doc._id);
  case 'DOC_INSERT':
    return [...state.filter(d => d._id !== action.doc._id), strip(action.doc)].sort(sort);
  default:
    return state;
  }
};
