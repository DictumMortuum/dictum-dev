'use strict';

import moment from 'moment';
import { sort, cast } from '../db';

const defaultState = {
  from: moment(new Date()).startOf('day').subtract(30, 'days').toISOString(),
  to: moment(new Date()).startOf('day').toISOString()
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    if (action.docs.length > 0) {
      return {
        to: action.docs[0]._id,
        from: action.docs[action.docs.length - 1]._id
      };
    } else {
      return state;
    }
  case 'DOC_INSERT':
    if (sort(action.doc, cast(state.to))) {
      return {...state, to: action.doc._id};
    }
    if (sort(cast(state.from), action.doc)) {
      return {...state, from: action.doc._id};
    }
    return state;
  // TODO maybe add DOC_DELETE case.
  default:
    return state;
  }
};
