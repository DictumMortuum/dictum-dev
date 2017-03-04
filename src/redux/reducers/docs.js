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
