'use strict';

import store from './store';
import PouchDB from 'pouchdb';
import { receiveConfig } from './actions/config';
import { receiveDoc } from './actions/docs';

export const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(\.[0-9]{3})?Z/;

// then replicate this to a pouch instance
// then use the pouch instance to keep couchdb clean
let remote = new PouchDB('http://localhost:5984/work');
let db = new PouchDB('work_test');
remote.replicate.to(db);

export function format(doc) {
  return Object.assign({}, {
    date: new Date(doc._id),
    ticket: '',
    product: '',
    company: '',
    desc: '',
    type: '',
    lang: []
  }, doc);
}

remote.changes({
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

export default db;
