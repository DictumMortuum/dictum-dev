'use strict';

import { fetchDocs } from './docs';
import { fetchConfig } from './config';

export function toEditor(doc, index) {
  return {
    type: 'TO_EDITOR',
    doc,
    id: index
  };
}

export function editorChange(component, value) {
  return (dispatch, state) => {
    let temp = value;

    if (component === 'lang') {
      temp = value.split(',');
    }

    dispatch({
      type: 'FROM_CHANGE',
      component,
      value: temp
    });

    dispatch({
      type: 'DOC_EDIT',
      editor: state().editor
    });
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
