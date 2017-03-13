'use strict';

const defaultState = {
  open: false,
  desc: ''
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'INFO':
    return {
      open: true,
      desc: action.desc
    };
  default:
    return state;
  }
};
