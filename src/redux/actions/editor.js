'use strict';

import { fetchDocs, insertDoc } from './docs';
import { fetchConfig } from './config';
import timeout from '../timeout';

export function toEditor(doc) {
  return {
    type: 'EDIT',
    doc
  };
}

export function editorChange(attr, value) {
  return (dispatch, state) => {
    let doc = { ...state().editor, [attr]: value };
    dispatch(toEditor(doc));
    document.onkeypress = timeout(() => dispatch(insertDoc(doc)));
  };
}

export function toInit() {
  return dispatch => fetchConfig('dictum_config').then(
    conf => {
      dispatch(conf);
      dispatch(fetchDocs());
    });
}
