'use strict';

const defaultState = {};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOC_EDIT':
    return action.doc;
  default:
    return state;
  }
};
