'use strict';

import { regex } from '../db';
import moment from 'moment';

const defaultState = {
  docs: [],
  date: {
    from: moment(new Date()).startOf('day').subtract(30, 'days').toISOString(),
    to: moment(new Date()).startOf('day').toISOString()
  },
  tags: []
};

Array.prototype.unique = function () {
  let hash = {};
  let result = [];

  for (let i = 0, l = this.length; i < l; i++) {
    if (!hash.hasOwnProperty(this[i])) {
      hash[ this[i] ] = true;
      result.push(this[i]);
    }
  }

  return result;
};

function flatten(acc, cur) {
  cur.map(c => {
    acc.push(c);
  });

  return acc;
}

function format(doc) {
  return Object.assign({}, doc, { date: new Date(doc.id) });
}

export default (state=defaultState, action) => {
  let docs = [];

  // TODO: check that docs are alright
  switch (action.type) {
  case 'DOCS_FETCH':
    docs = action.docs
      .filter(d => regex.test(d.key))
      .map(d => format(d))
      .sort((a, b) => a.date - b.date);
    break;
  case 'DOC_DELETE':
    docs = state.docs
      .filter(d => d._id !== action.id);
    break;
  case 'DOC_INSERT':
    docs = [...state.docs.filter(d => d._id !== action.id), format(action.doc)]
      .sort((a, b) => a.date - b.date);
    break;
  default:
    return state;
  }

  return {
    docs: docs,
    date: {
      from: docs[0]._id,
      to: docs[docs.length - 1]._id
    },
    tags: docs.map(d => d.lang || []).reduce(flatten, []).sort().unique()
  };
};
