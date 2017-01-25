'use strict';

import { fetchDoc } from './docs';

/*
TODO maybe something like this
function registerCastWithId(id, name) {
  return { type: REGISTER_CAST, id, name };
}

function generateNextId() {
 // ...
}

export function registerCast(name) {
  return dispatch => {
    let id = generateNextId();
    dispatch(registerCastWithId(id, name));
    return id;
  }
}
*/

/* TODO the configuration doc name should be hardcoded */
export function fetchConfig() {
  return fetchDoc('dictum_config').then((result) => {
    console.log(result);
    return {
      type: 'CONFIG',
      doc: result.doc
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
