'use strict';

const defaultState = {
  locale: 'el-gr',
  company: ['openbet', 'unify'],
  drawer: false,
  jiraPrefix: 'https://jira.dev.global-intra.net:8443/',
  editor: true,
  properties: true
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'CONFIG':
    return action.doc;
  case 'CONFIG_DEFAULT':
    return defaultState;
  case 'TOGGLE_DRAWER':
    return {...state, drawer: !state.drawer };
  case 'TOGGLE_EDITOR':
    return {...state, editor: !state.editor };
  case 'TOGGLE_PROPERTIES':
    return {...state, properties: !state.properties };
  default:
    return state;
  }
};
