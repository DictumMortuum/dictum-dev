'use strict';

import db from './db';
import { create } from './db';
import timeout from './timeout';

export const Doc = {
  edit: doc => {
    return {
      type: 'EDIT',
      doc
    };
  },
  delete: doc => {
    return {
      type: 'DOC_DELETE',
      doc
    };
  },
  insert: doc => {
    return {
      type: 'DOC_INSERT',
      doc
    };
  },
  bulk: (args={}) => db.allDocs(args).then(docs => {
    return {
      type: 'DOCS_FETCH',
      docs: docs
    };
  }),
  scroll: () => {
    return {
      type: 'DOC_LENGTH'
    };
  },
  new: _newDoc,
  commit: _commitDoc,
  remove: _removeDoc
};

function _newDoc() {
  return dispatch => dispatch(
    Promise.resolve(Doc.insert(create()))
  ).then(
    action => dispatch(Doc.edit(action.doc))
  );
}

function _commitDoc() {
  return (dispatch, state) => dispatch(
    db.put(state().editor).then(d => Doc.insert(d))
  ).then(
    action => dispatch(Doc.edit(action.doc))
  );
}

function _removeDoc(doc) {
  return db.remove(doc).then(() => Doc.delete(doc));
}

export const Config = {
  get: c => db.get(c).then(d => {
    return {
      type: 'CONFIG',
      doc: d
    };
  }).catch(err => {
    if (err.name === 'not_found') {
      return {
        type: 'CONFIG_DEFAULT'
      };
    } else {
      throw err;
    }
  }),
  drawer: () => {
    return {
      type: 'TOGGLE_DRAWER'
    };
  }
};

export const Editor = {
  change: (attr, value) => {
    return (dispatch, state) => {
      let d = { ...state().editor, [attr]: value };
      dispatch(Doc.edit(d));
      document.onkeypress = timeout(
        () => dispatch(Doc.insert(d))
      );
    };
  }
};

export function init() {
  return dispatch => dispatch(
    Config.get('dictum_config')
  ).then(
    () => dispatch(Doc.bulk())
  ).then(
    f => dispatch(Doc.edit(f.docs[0]))
  );
}
