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

Array.prototype.uniqueCount = function () {
  let hash = {};
  let result = [];

  for (let i = 0, l = this.length; i < l; i++) {
    if (!hash.hasOwnProperty(this[i])) {
      hash[ this[i] ] = 1;
    } else {
      hash[ this[i] ]++;
    }
  }

  for (let k in hash) {
    if (hash.hasOwnProperty(k)) {
      result.push({
        tag: k,
        count: hash[k]
      });
    }
  }

  return result.sort((a, b) => b.count - a.count);
};

function flatten(acc, cur) {
  cur.map(c => {
    acc.push(c);
  });

  return acc;
}

function format(doc) {
  return Object.assign({}, {
    date: new Date(doc._id),
    ticket: '',
    product: '',
    company: '',
    desc: '',
    type: '',
    lang: ''
  }, doc);
}

export default (state=defaultState, action) => {
  let docs = [];
  let today = [];
  let now = new Date();

  // TODO: check that docs are alright
  switch (action.type) {
  case 'DOCS_FETCH':
    docs = action.docs
      .filter(d => regex.test(d.key))
      .map(d => format(d.doc))
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

  for (let i = docs.length; i > 0; i--) {
    if (now - docs[i-1].date < 86400000) {
      today.push(docs[i]);
    } else {
      break;
    }
  }

  return {
    docs: docs,
    today: today,
    date: {
      from: docs[0]._id,
      to: docs[docs.length - 1]._id
    },
    tags: docs.map(d => d.lang || []).reduce(flatten, []).uniqueCount()
  };
};
