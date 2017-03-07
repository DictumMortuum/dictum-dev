'use strict';

const defaultState = 20;

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOC_LENGTH':
    return state + defaultState;
  default:
    return state;
  }
};
