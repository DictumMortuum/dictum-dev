'use strict';

const defaultState = {
  open: false,
  message: ''
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'INFO':
    return {
      open: true,
      message: action.message
    };
  default:
    return state;
  }
};
