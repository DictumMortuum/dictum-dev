'use strict';

const defaultState = [];

function flatten(acc, cur) {
  cur.map(c => {
    acc.push(c);
  });

  return acc;
}

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'DOCS_FETCH':
    return action.docs.map(d => d.lang || []).reduce(flatten, []).uniqueCount();
  case 'DOC_INSERT':
    let tags = [...state];
    action.doc.lang.map(tag => {
      tags.map(el => {
        if (el.tag === tag) {
          el.count++;
        }
      });
    });
    return tags;
  // TODO DOC_DELETE
  default:
    return state;
  }
};
