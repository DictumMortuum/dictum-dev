'use strict';

import Fuse from 'fuse.js';

const options = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['desc']
};

const defaultState = new Fuse([], options);

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return new Fuse(action.docs, options);
  default:
    return state;
  }
};
