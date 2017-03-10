'use strict';

import moment from 'moment';

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
  // TODO maybe add DOC_INSERT and DOC_DELETE cases.
  default:
    return state;
  }
};
