'use strict';

import { format } from '../db';

const defaultState = {
  doc: format({
    _id: new Date()
  }),
  id: 0
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'EDIT':
    return Object.assign({}, state, { doc: action.doc, id: action.id });
  default:
    return state;
  }
};
