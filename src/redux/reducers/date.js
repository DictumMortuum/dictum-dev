'use strict';

import { sort, cast } from '../db';

const defaultState = () => {
  let from = new Date();
  let to = new Date();

  return {
    to: to.toISOString(),
    from: from.toISOString(),
    minDate: new Date(from),
    maxDate: new Date(to)
  };
};

export default (state=defaultState(), action) => {
  switch (action.type) {
  case 'DATE_INIT':
    if (action.docs.length > 0) {
      let l = action.docs.length - 1;

      return {
        ...state,
        maxDate: new Date(action.docs[0]._id),
        minDate: new Date(action.docs[l]._id)
      };
    } else {
      return state;
    }
  case 'DOCS_FETCH':
    if (action.docs.length > 0) {
      let l = action.docs.length - 1;

      return {
        ...state,
        to: action.docs[0]._id,
        from: action.docs[l]._id
      };
    } else {
      return state;
    }
  case 'DOC_INSERT':
    if (sort(action.doc, cast(state.to))) {
      return {...state, maxDate: new Date(action.doc._id)};
    }
    return state;
  /*
    TODO fix this.
  case 'DOC_DELETE':
    if (sort(cast(state.from), action.doc)) {
      return {...state, minDate: new Date(action.doc._id)};
    }
    return state;
  */
  default:
    return state;
  }
};
