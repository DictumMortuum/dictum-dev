'use strict';

import { regex } from '../db';

export default (state=[], action) => {
  switch (action.type) {
    case 'DOCS_FETCH':
      return action.docs.filter(d => regex.test(d.key)).map(d => d.key).sort();
    case 'DOC_DELETE':
      return state.docs.filter(d => d !== action.id);
    case 'DOC_INSERT':
      return [...state.docs.filter(d => d !== action.id), action.id].sort();
    default:
      return state;
  }
};
