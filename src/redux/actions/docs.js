'use strict';

import db from './db';

export function fetchDocs() {
  return db.allDocs({
    include_docs: true // eslint-disable-line camelcase
  }).then(result => {
    return {
      type: 'DOCS_FETCH',
      docs: _fetch(result)
    };
  }).catch(err => {
    throw err;
  });
}

export function fetchDoc(id) {
  return db.get(id).then(result => {
    return {
      type: 'DOC_INSERT',
      doc: result
    };
  }).catch(err => {
    throw err;
  });
}

export function insertDoc(doc) {
  return db.put(doc).then(() => {
    return {
      type 'DOC_INSERT',
      doc: doc
    }
  }).catch(err => {
    throw err;
  });
}

export function deleteDoc(id, rev) {
  return db.remove(id, rev).then(() => {
    return {
      type: 'DOC_DELETE',
      id: id
    };
  }).catch(err => {
    throw err;
  });
}

function _fetch(records) {
  if (!records) {
    return [];
  }

  return records.rows.map(r => r.doc);
}
