'use strict';

import db from '../db';

/* TODO the configuration doc name should not be hardcoded */
export function fetchConfig() {
  return db.get('dictum_config').then(result => {
    return {
      type: 'CONFIG',
      doc: result
    };
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
