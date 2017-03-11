'use strict';

import store from './store';
import PouchDB from 'pouchdb';
import { receiveConfig, receiveDoc } from './actions';

let db = new PouchDB('http://localhost:5984/work_test');

export const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{3})?Z/;
export const sort = (a, b) => b._id > a._id;
export const create = () => {
  return { _id: new Date().toISOString() };
};

db.changes({
  live: true,
  include_docs: true, // eslint-disable-line camelcase
  since: 'now'
}).on('change', callback)
  .on('error', console.log.bind(console));

function callback(change) {
  // change.id contains the id
  // change.doc contains the doc (assuming include_docs: true)
  if (regex.test(change.id)) {
    store.dispatch(receiveDoc(change));
  } else {
    store.dispatch(receiveConfig(change.doc));
  }
}

const _err = err => {
  throw err;
};
const _test = d => regex.test(d._id);

export default {
  get: (id) => db.get(id).catch(_err),
  put: (doc) => db.put(doc).catch(_err).then(r => {
    return {
      ...doc, _rev: r.rev
    };
  }),
  allDocs: (args) => db.allDocs({...args, include_docs: true}) // eslint-disable-line camelcase
    .catch(_err)
    .then(r => {
      return [...r.rows.map(d => d.doc), create() ].filter(_test).sort(sort);
    })
};
