'use strict';

const defaultState = {
  term: '',
  docs: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOC_SEARCH':
    return {
      ...state,
      docs: action.docs
    };
  case 'DOC_TERM':
    return {
      ...state,
      term: action.term
    };
  default:
    return state;
  }
};
