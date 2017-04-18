'use strict';

import { create } from './db';
import timeout from 'reset-timeout';
import Fuse from 'fuse.js';

const options = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 2000,
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

export const Type = {
  add: t => ({ type: 'TYPE_ADD', t }),
  remove: t => ({ type: 'TYPE_REMOVE', t }),
  set: t => ({ type: 'TYPE_SET', types: t })
};

export const Info = {
  send: message => ({ type: 'INFO', message })
};

export const Doc = {
  edit: doc => ({ type: 'DOC_EDIT', doc }),
  delete: doc => ({ type: 'DOC_DELETE', doc }),
  insert: doc => ({ type: 'DOC_INSERT', doc }),
  scroll: () => ({ type: 'DOC_LENGTH' }),
  new: _newDoc,
  commit: _commitDoc,
  remove: _removeDoc,
  search: _searchDoc
};

Doc.bulk = (args={}) => {
  return (dispatch, state) => dispatch(
    state().db.allDocs(args).then(docs => ({ type: 'DOCS_FETCH', docs }))
  );
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
    state().db.put(state().editor).then(d => Doc.insert(d))
  ).then(
    action => dispatch(Doc.edit(action.doc))
  ).then(
    () => dispatch(Info.send('The doc has been committed.'))
  );
}

function _removeDoc(doc) {
  return (dispatch, state) => state().db.remove(doc).then(() => Doc.delete(doc));
  // TODO add info message here, but first must return dispatch
}

function _searchDoc(term) {
  return (dispatch, state) => {
    dispatch({ type: 'DOC_TERM', term });
    document.onkeypress = timeout(() => {
      fuse.set(state().docs);
      let r = fuse.search(term);
      dispatch({ type: 'DOC_SEARCH', docs: r });

      if (r.length === 0) {
        dispatch(Info.send('No results found.'));
      } else {
        dispatch(Info.send('Found ' + r.length + ' results.'));
      }
    });
  };
}

export const Config = {
  drawer: () => ({ type: 'TOGGLE_DRAWER' }),
  editor: () => ({ type: 'TOGGLE_EDITOR' }),
  properties: () => ({ type: 'TOGGLE_PROPERTIES' }),
  editProperty: p => ({ type: 'EDIT_PROPERTY', property: p }),
  editJira: j => ({ type: 'EDIT_JIRA', jira: j }),
  temp: t => ({ type: 'CONFIG_TEMP', temp: t })
};

Config.get = c => {
  return (dispatch, state) => dispatch(
    state().db.get(c).then(doc => ({ type: 'CONFIG', doc }))
    .catch(() => ({ type: 'CONFIG_DEFAULT' }))
  );
};

Config.save = () => {
  return (dispatch, state) => {
    state().db.put({...state().config, _id: 'dictum_config'});
    dispatch(Info.send('The configuration has been saved.'));
  };
};

Config.insert = value => {
  return dispatch => {
    dispatch(Config.temp(value));
    document.onkeypress = timeout(() => dispatch(Config.editProperty({
      order: 100,
      name: value,
      hint: value + '(s)',
      status: true
    })));
  };
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
    Promise.resolve({
      type: 'DB_INIT',
      url: 'https://dictummortuum.cloudant.com/hackernews'
    })
  ).then(
    () => dispatch(Config.get('dictum_config'))
  ).then(
    () => dispatch(Doc.bulk())
  ).then(
    f => dispatch(Date.init(f.docs))
  ).then(
    f => dispatch(Doc.edit(f.docs[0]))
  );
}
