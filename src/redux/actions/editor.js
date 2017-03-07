'use strict';

import { fetchDocs } from './docs';
import { fetchConfig } from './config';
import typing from '../timeout';

export function toEditor(doc, index) {
  return {
    type: 'TO_EDITOR',
    doc,
    id: index
  };
}

export function editorChange(id, doc) {
  return dispatch => {
    dispatch({
      type: 'FROM_CHANGE',
      doc
    });

    document.onkeypress = typing(() => dispatch({
      type: 'DOC_EDIT',
      id,
      doc
    }));
  };
}

export function toInit() {
  return (dispatch, state) => fetchConfig('dictum_config').then(
    conf => {
      dispatch(conf);
      return fetchDocs().then(
        docs => {
          dispatch(docs);
          dispatch({
            type: 'TO_VIEWER',
            docs: state().docs.docs
          });
        });
    });
}
