'use strict';

import { insertDoc } from './docs';
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
