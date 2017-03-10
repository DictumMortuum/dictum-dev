'use strict';

import db from '../db';
import { regex, create } from '../db';
import { toEditor } from './editor';

export function fetchDocs(args={}) {
  return db.allDocs(args)
  .then(docs => {
    return {
      type: 'DOCS_FETCH',
      docs: docs
    };
  });
}

export function commitDoc() {
  return (dispatch, state) => dispatch(
    db.put(state().editor).then(doc => {
      return {
        type: 'DOC_INSERT',
        doc
      };
    })
  ).then(
    action => dispatch(toEditor(action.doc))
  );
}

export function insertDoc(doc) {
  if (!regex.test(doc._id)) {
    return Promise.resolve({ type: 'DEFAULT' });
  } else {
    return Promise.resolve({
      type: 'DOC_INSERT',
      doc
    });
  }
}

// FROM replication
// TODO move this to db
export function receiveDoc(change) {
  if (change.deleted) {
    return {
      type: 'DOC_DELETE',
      id: change.id
    };
  } else {
    return {
      type: 'DOC_INSERT',
      id: change.id,
      doc: change.doc
    };
  }
}

// TO pouch
export function deleteDoc(id, rev) {
  if (!regex.test(id)) {
    return Promise.resolve({ type: 'DEFAULT' });
  } else {
    return db.remove(id, rev).then(() => {
      return {
        type: 'DOC_DELETE',
        id: id
      };
    }).catch(err => {
      throw err;
    });
  }
}

export function scrollDocs() {
  return {
    type: 'DOC_LENGTH'
  };
}

export function newDoc() {
  let doc = create();

  return dispatch => dispatch(
    insertDoc(doc)
  ).then(
    action => dispatch(toEditor(action.doc))
  );
}
