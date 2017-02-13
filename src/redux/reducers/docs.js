'use strict';

import { regex } from '../db';

export default (state=[], action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return action.docs.filter(d => regex.test(d.key))
      .map(d => Object.assign({}, d.doc, { date: new Date(d._id) }));
  case 'DOC_DELETE':
    return state.docs.filter(d => d._id !== action.id);
  case 'DOC_INSERT':
    return [...state.docs.filter(d => d._id !== action.id), action.doc];
  default:
    return state;
  }
};
