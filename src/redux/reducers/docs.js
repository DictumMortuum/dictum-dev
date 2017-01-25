'use strict';

export default (state=[], action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return action.docs;
  case 'DOC_DELETE':
    return state.docs.filter(doc => doc.id !== action.id);
  case 'DOC_INSERT':
    return [...state.docs, action.doc];
  default:
    return state;
  }
};
