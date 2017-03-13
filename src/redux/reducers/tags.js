'use strict';

const defaultState = [];

function flatten(acc, cur) {
  cur.map(c => {
    acc.push(c);
  });

  return acc;
}

function apply(action, tags, callback) {
  if (action.doc.lang) {
    action.doc.lang.map(tag => {
      tags.map(el => {
        if (el.tag === tag) {
          el.count = callback(el.count);
        }
      });
    });
  }
  return tags;
}

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return action.docs.map(d => d.lang || []).reduce(flatten, []).uniqueCount();
  case 'DOC_INSERT':
    return apply(action, [...state], d => d+1);
  case 'DOC_DELETE':
    return apply(action, [...state], d => d-1);
  default:
    return state;
  }
};
