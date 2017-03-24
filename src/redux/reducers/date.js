'use strict';

import { sort, cast } from '../db';
import { startOfDay, daysAgo } from 'date-utils';

const defaultState = () => {
  let to = new Date();

  return {
    to: to.toISOString(),
    from: daysAgo(startOfDay(to)).toISOString()
  };
};

export default (state=defaultState(), action) => {
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
