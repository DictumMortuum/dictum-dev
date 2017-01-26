'use strict';

import store from './store';
import PouchDB from 'pouchdb';
import { receiveConfig } from './actions/config';
import { receiveDoc } from './actions/docs';

export const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/;
let db = new PouchDB('http://localhost:5984/work');
// then replicate this to a pouch instance
// then use the pouch instance to keep couchdb clean

db.changes({
  live: true,
  include_doc: true, // eslint-disable-line camelcase
  since: 'now'
}).on('change', callback)
  .on('error', console.log.bind(console));

function callback(change) {
  // change.id contains the id
  // change.doc contains the doc

  if (regex.test(change.id)) {
    store.dispatch(receiveDoc(change));
  } else {
    store.dispatch(receiveConfig(change.doc));
  }
}

export default db;
