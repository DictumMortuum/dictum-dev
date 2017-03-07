'use strict';

import db from '../db';
import { regex, format } from '../db';

export function fetchDocs(args={}) {
  return db.allDocs(Object.assign({}, args, {
    include_docs: true // eslint-disable-line camelcase
  })).then(result => {
    let docs = result.rows || [];

    return {
      type: 'DOCS_FETCH',
      docs: docs.filter(d => regex.test(d.key))
        .map(d => format(d.doc))
        .sort((a, b) => b.date - a.date)
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
        doc: format(result),
        id: id
      };
    }).catch(err => {
      throw err;
    });
  }
}

// TO pouch
export function insertDoc(doc) {
  if (regex.test(doc._id)) {
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
      doc: format(doc),
      id: doc._id
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
      doc: format(change.doc)
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
