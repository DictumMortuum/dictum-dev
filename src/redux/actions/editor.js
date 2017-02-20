'use strict';

import { fetchDocs } from './docs';
import { fetchConfig } from './config';

export function toViewer(docs) {
  return {
    type: 'TO_VIEWER',
    docs
  };
}

export function toEditor(doc) {
  return {
    type: 'TO_EDITOR',
    doc
  };
}

export function editorChange(component, value) {
  if (component === 'lang') {
    return {
      type: 'EDITOR_CHANGE',
      component,
      value: value.split(',')
    };
  } else {
    return {
      type: 'EDITOR_CHANGE',
      component,
      value
    };
  }
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
