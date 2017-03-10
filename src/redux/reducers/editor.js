'use strict';

const defaultState = {};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'EDIT':
    return action.doc;
  default:
    return state;
  }
};
