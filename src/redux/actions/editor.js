'use strict';

import { fetchDocs } from './docs';
import { fetchConfig } from './config';

export function toViewer(docs) {
  return {
    type: 'TO_VIEWER',
    docs: docs
  };
}

export function toInit() {
  return (dispatch, state) =>
    fetchConfig('dictum_config').then(
      conf => {
        dispatch(conf);
        return fetchDocs().then(
          docs => {
            dispatch(docs);
            dispatch(toViewer(state().docs.today));
          }
        );
      }
    );
}

export function toEditor(doc) {
  return {
    type: 'TO_EDITOR',
    doc: doc
  };
}
