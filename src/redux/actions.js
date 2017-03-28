'use strict';

import db from './db';
import { create } from './db';
import timeout from 'reset-timeout';
import Fuse from 'fuse.js';

const options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: ['desc']
};

let fuse = new Fuse([], options);

export const Filter = {
  add: f => ({ type: 'FILTER_ADD', filter: f }),
  remove: f => ({ type: 'FILTER_REMOVE', filter: f}),
  toggle: _toggleFilter
};

function _toggleFilter(f) {
  return (dispatch, state) => dispatch(
    state().filter.indexOf(f) === -1 ? Filter.add(f) : Filter.remove(f)
  );
}

export const Info = {
  send: message => ({ type: 'INFO', message })
};

export const Doc = {
  edit: doc => ({ type: 'DOC_EDIT', doc }),
  delete: doc => ({ type: 'DOC_DELETE', doc }),
  insert: doc => ({ type: 'DOC_INSERT', doc }),
  bulk: (args={}) => db.allDocs(args).then(docs => ({ type: 'DOCS_FETCH', docs })),
  scroll: () => ({ type: 'DOC_LENGTH' }),
  new: _newDoc,
  commit: _commitDoc,
  remove: _removeDoc,
  search: _searchDoc
};

export const Date = {
  init: docs => ({ type: 'DATE_INIT', docs })
};

function _newDoc() {
  return dispatch => dispatch(
    Promise.resolve(Doc.insert(create()))
  ).then(
    action => dispatch(Doc.edit(action.doc))
  ).then(
    () => dispatch(Info.send('A new doc was created.'))
  );
}

function _commitDoc() {
  return (dispatch, state) => dispatch(
    db.put(state().editor).then(d => Doc.insert(d))
  ).then(
    action => dispatch(Doc.edit(action.doc))
  ).then(
    () => dispatch(Info.send('The doc has been committed.'))
  );
}

function _removeDoc(doc) {
  return db.remove(doc).then(() => Doc.delete(doc));
  // TODO add info message here, but first must return dispatch
}

function _searchDoc(term) {
  return (dispatch, state) => {
    console.log(state().docs.length);
    fuse.set(state().docs);
    console.log(fuse);
    console.log(fuse.search(term));
    dispatch({
      type: 'DOC_SEARCH',
      term,
      docs: fuse.search(term)
    });
  };
}

export const Config = {
  get: c => db.get(c).then(doc => ({ type: 'CONFIG', doc }))
  .catch(() => ({ type: 'CONFIG_DEFAULT' })),
  drawer: () => ({ type: 'TOGGLE_DRAWER' }),
  editor: () => ({ type: 'TOGGLE_EDITOR' })
};

export const Editor = {
  change: (attr, value) => {
    return (dispatch, state) => {
      let d = { ...state().editor, [attr]: value };
      dispatch(Doc.edit(d));
      document.onkeypress = timeout(() => dispatch(Doc.insert(d)), 300);
    };
  }
};

export function init() {
  return dispatch => dispatch(
    Config.get('dictum_config')
  ).then(
    () => dispatch(Doc.bulk())
  ).then(
    f => dispatch(Date.init(f.docs))
  ).then(
    f => dispatch(Doc.edit(f.docs[0]))
  );
}
