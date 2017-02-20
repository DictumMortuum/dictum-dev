'use strict';

import { format } from '../db';

const defaultState = {
  doc: format({
    _id: new Date()
  }),
  id: 0
};

export default (state=defaultState, action) => {
  let temp;

  switch (action.type) {
  case 'TO_EDITOR':
    return Object.assign({}, state, { doc: action.doc, id: action.id });
  case 'FROM_CHANGE':
    temp = state.doc;
    temp[action.component] = action.value;
    return Object.assign({}, state, { doc: temp });
  default:
    return state;
  }
};
