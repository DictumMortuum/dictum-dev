'use strict';

import db from '../db';
import { fetchDocs } from './docs';
import { toEditor } from './editor';

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
  return dispatch => dispatch(
    fetchConfig('dictum_config')
  ).then(
    () => dispatch(fetchDocs())
  ).then(
    f => dispatch(toEditor(f.docs[0]))
  );
}
