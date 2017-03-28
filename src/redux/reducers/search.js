'use strict';

const defaultState = {
  term: '',
  docs: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOC_SEARCH':
    return {
      term: action.term,
      docs: action.docs
    };
  default:
    return state;
  }
};
