'use strict';

import store from './store';
import PouchDB from 'pouchdb';
import { fetchDocs } from './actions';

let db = new PouchDB('http://localhost:5984/test');
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

  if (change.deleted) {
    store.dispatch(receiveDelete(change.id));
  } else if (/1-*/.match(change.id)) {
    // TODO I guess I can't have a new insert with an _rev higher than 1.
    store.dispatch(receiveInsert(change.doc));
  } else
    // TODO see if I can avoid refetching everything on document updates.
    store.dispatch(sendFetch())
  }
}

export default db;
