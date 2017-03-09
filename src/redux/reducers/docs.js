'use strict';

const defaultState = [];

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return action.docs;
  case 'DOC_DELETE':
    return state.filter(d => d._id !== action.id);
  case 'DOC_INSERT':
    console.log(action.doc);
    return [...state.filter(d => d._id !== action.doc._id), action.doc]
    .sort((a, b) => b.date - a.date);
  default:
    return state;
  }
};
