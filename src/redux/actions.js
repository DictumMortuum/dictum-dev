'use strict';

import moment from 'moment';
import db from './db';

export function togglePeopleModal() {
  return {
    type: 'TOGGLE_PEOPLE_MODAL'
  };
}

export function fetchDocs() {
  return db.allDocs({
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

export function searchDocs(args={
  from: moment(new Date()).startOf('day').subtract(30, 'days').toISOString(),
  to: moment(new Date()).toISOString()
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

export function deleteDoc() {
  return {
    type: 'DELETE'
  };
}

export function insertDoc(name) {
  return db.put({
    _id: generateId(),
    name: name
  }).then(() => {
    return {
      type: 'INSERT'
    };
  }).catch(err => {
    throw err;
  });
}

function mapDocsFromPouch(records) {
  if (!records) {
    return {};
  }

  return records.rows.map(record => record.doc);
}

function generateId() {
  return new Date().toJSON();
}
