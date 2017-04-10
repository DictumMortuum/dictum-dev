'use strict';

import { sort } from '../db';

const defaultState = {
  term: '',
  docs: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOC_SEARCH':
    return {
      ...state,
      docs: action.docs.sort(sort)
    };
  case 'DOC_TERM':
    return {
      ...state,
      term: action.term
    };
  case 'DOC_INSERT':
    if (state.docs.length === 0) {
      return state;
    } else {
      return {
        ...state,
        docs: [...state.docs.filter(d => d._id !== action.doc._id), action.doc].sort(sort)
      };
    }
  default:
    return state;
  }
};
