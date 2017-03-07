'use strict';

import db from '../db';
import { fetchDocs } from './docs';

/* TODO the configuration doc name should not be hardcoded */
export function fetchConfig(config) {
  return db.get(config).then(result => {
    return {
      type: 'CONFIG',
      doc: result
    };
  }).catch(err => {
    if (err.name === 'not_found') {
      return {
        type: 'CONFIG_DEFAULT'
      };
    } else {
      throw err;
    }
  });
}

export function receiveConfig(doc) {
  return {
    type: 'CONFIG',
    doc: doc
  };
}

export function toggleDrawer() {
  return {
    type: 'TOGGLE_DRAWER'
  };
}

export function toInit() {
  return dispatch => fetchConfig('dictum_config').then(
    conf => {
      dispatch(conf);
      dispatch(fetchDocs());
    });
}
