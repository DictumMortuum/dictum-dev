'use strict';

import moment from 'moment';
import db from './db';

/* TODO configure startkey / endkey */
export function sendFetch(args={
  startkey: moment(new Date()).startOf('day').subtract(30, 'days').toISOString(),
  endkey: moment(new Date()).toISOString()
}) {
  return db.allDocs({
    ...args,
    include_docs: true // eslint-disable-line camelcase
  }).then(result => {
    return {
      type: 'FETCH',
      docs: mapDocsFromPouch(result)
    };
  }).catch(err => {
    throw err;
  });
}

export function sendInsert(doc) {
  return db.put(doc).then(() => {
    return receiveInsert(doc);
  }).catch(err => {
    throw err;
  });
}

export function receiveInsert(doc) {
  return {
    type: 'INSERT',
    doc: doc
  };
}

export function sendDelete(doc.id, doc.rev) {
  return db.remote(doc.id, doc.rev).then(() => {
    return receiveDelete(doc.id);
  }).catch(err => {
    throw err;
  });
}

export function receiveDelete(id) {
  return {
    type: 'DELETE',
    id: id
  };
}

/* TODO the configuration doc name should be hardcoded */
export function sendConfig(doc) {
  return db.get('dictum_config').then((doc) => {
    return receiveConfig(doc);
  }).catch(err => {
    /* TODO check if that err.name === 'not_found' is still valid
    if (err.name === 'not_found') {
      return {
        type: 'CONFIG_DEFAULT'
      };
    } else {
      throw err;
    }*/
    return {
      type: 'CONFIG_DEFAULT'
    };
  });
}

export function receiveConfig(doc) {
  return {
    type: 'CONFIG',
    doc: doc
  };
}

function mapDocsFromPouch(records) {
  if (!records) {
    return [];
  }

  /* filter out configuration docs */
  /* TODO do I need filter with startkey/endkey in the pouchdb query? */
  return records.rows.map(record => record.doc).filter(doc => /\b[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z\b/.match(doc._id));
}

function generateId() {
  return new Date().toJSON();
}
