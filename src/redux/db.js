'use strict';

import store from './store';
import PouchDB from 'pouchdb';
import { Doc } from './actions';

let db = new PouchDB('https://localhost:6984/work');

export const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{3})?Z/;
export const sort = (a, b) => new Date(b.updated || b._id) - new Date(a.updated || a._id);
export const create = () => ({ _id: new Date().toISOString() });
export const cast = doc => ({ _id: new Date(doc).toISOString() });

db.changes({
  live: true,
  include_docs: true, // eslint-disable-line camelcase
  since: 'now'
})
.on('error', console.log.bind(console))
.on('change', change => {
  // change.id contains the id
  // change.doc contains the doc (assuming include_docs: true)
  if (regex.test(change.id)) {
    if (change.deleted) {
      store.dispatch(Doc.delete(change.doc));
    } else {
      store.dispatch(Doc.insert(change.doc));
    }
  }
});

const _err = err => {
  throw err;
};
const _test = d => regex.test(d._id);

export default {
  get: id => db.get(id).catch(_err),
  put: doc => {
    let d = { ...doc, updated: new Date().toISOString() };
    return db.put(d).catch(_err).then(r => ({ ...d, _rev: r.rev }));
  },
  remove: doc => db.remove(doc._id, doc._rev).catch(_err),
  allDocs: args => db.allDocs({ ...args, include_docs: true }) // eslint-disable-line camelcase
    .catch(_err)
    .then(r => [...r.rows.map(d => d.doc)].filter(_test).sort(sort))
};
