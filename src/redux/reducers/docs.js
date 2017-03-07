'use strict';

import { regex, format } from '../db';
import moment from 'moment';

const defaultState = {
  docs: [],
  date: {
    from: moment(new Date()).startOf('day').subtract(30, 'days').toISOString(),
    to: moment(new Date()).startOf('day').toISOString()
  },
  tags: [],
  length: 20
};

export default (state=defaultState, action) => {
  let docs = [];
  let temp;

  // TODO: check that docs are alright
  switch (action.type) {
  case 'DOCS_FETCH':
    docs = action.docs
      .filter(d => regex.test(d.key))
      .map(d => format(d.doc))
      .sort((a, b) => b.date - a.date);
    break;
  case 'DOC_DELETE':
    docs = state.docs
      .filter(d => d._id !== action.id);
    break;
  case 'DOC_INSERT':
    docs = [...state.docs.filter(d => d._id !== action.id), format(action.doc)]
      .sort((a, b) => b.date - a.date);
    break;
  case 'DOC_EDIT':
    temp = Object.assign({}, state);
    temp.docs[action.id] = action.doc;
    return temp;
  case 'DOC_LENGTH':
    temp = Object.assign({}, state);
    temp.length = temp.length + 20;
    return temp;
  default:
    return state;
  }

  return {
    docs: docs,
    date: {
      to: docs[0]._id,
      from: docs[docs.length - 1]._id
    },
    length: state.length
  };
};
