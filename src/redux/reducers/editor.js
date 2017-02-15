'use strict';

const defaultState = {
  docs: [],
  doc: {
    desc: ''
  }
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'TO_VIEWER':
    return Object.assign({}, state, { docs: action.docs });
  case 'TO_EDITOR':
    return Object.assign({}, state, { doc: action.doc });
  default:
    return state;
  }
};
