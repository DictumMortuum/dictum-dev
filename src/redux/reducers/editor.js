'use strict';

import { format } from '../db';

const defaultState = format({ _id: new Date() });

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'EDIT':
    return action.doc;
  default:
    return state;
  }
};
