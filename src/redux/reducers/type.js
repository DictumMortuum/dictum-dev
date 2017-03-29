'use strict';

const defaultState = [];

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return [...new Set(action.docs.map(d => d.type))];
  case 'DOC_INSERT':
    return [...new Set([...state, action.doc.type])];
  default:
    return state;
  }
};
