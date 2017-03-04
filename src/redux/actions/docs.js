'use strict';

import db from '../db';
import { regex } from '../db';

export function fetchDocs(args={}) {
  return db.allDocs(Object.assign({}, args, {
    include_docs: true // eslint-disable-line camelcase
  })).then(result => {
    return {
      type: 'DOCS_FETCH',
      docs: result.rows || []
    };
  }).catch(err => {
    throw err;
  });
}

// FROM pouch
export function fetchDoc(id) {
  if (regex.test(id)) {
    return {
      type: 'DEFAULT'
    };
  } else {
    return db.get(id).then(result => {
      return {
        type: 'DOC_INSERT',
        doc: result,
        id: id
      };
    }).catch(err => {
      throw err;
    });
  }
}

// TO pouch
export function insertDoc(doc) {
  if (regex.test(doc.id)) {
    return {
      type: 'DEFAULT'
    };
  } else {
    /*
    return db.put(doc).then(() => {
      return {
        type: 'DOC_INSERT',
        doc: doc,
        id: doc.id
      };
    }).catch(err => {
      throw err;
    });*/
    return {
      type: 'DOC_INSERT',
      doc: doc,
      id: doc.id
    };
  }
}

// FROM replication
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
  if (regex.test(id)) {
    return {
      type: 'DEFAULT'
    };
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
