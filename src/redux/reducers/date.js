'use strict';

import { regex } from '../db';
import moment from 'moment';

const defaultState = {
  docs: [],
  from: moment(new Date()).startOf('day').subtract(30, 'days').toISOString(),
  to: moment(new Date()).startOf('day').toISOString()
};

function format(state) {
  return {
    docs: state,
    from: state[0],
    to: state[state.length - 1]
  };
}

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return format(action.docs.filter(d => regex.test(d.key)).map(d => d.key).sort());
  case 'DOC_DELETE':
    return format(state.docs.filter(d => d !== action.id));
  case 'DOC_INSERT':
    return format([...state.docs.filter(d => d !== action.id), action.id].sort());
  default:
    return state;
  }
};
