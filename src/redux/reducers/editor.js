
'use strict';

const defaultState = {
  docs: [],
  doc: {
    lang: [],
    desc: ''
  }
};

export default (state=defaultState, action) => {
  let temp;

  switch (action.type) {
  case 'TO_VIEWER':
    return Object.assign({}, state, { docs: action.docs });
  case 'TO_EDITOR':
    return Object.assign({}, state, { doc: action.doc });
  case 'EDITOR_CHANGE':
    temp = state.doc;
    temp[action.component] = action.value;
    return Object.assign({}, state, temp);
  default:
    return state;
  }
};
