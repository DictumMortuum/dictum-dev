'use strict';

const defaultState = {
  locale: 'el-gr',
  drawer: false,
  jiraPrefix: 'https://jira.dev.global-intra.net:8443/',
  editor: true,
  properties: true,
  documentProperties: [{
    order: 1,
    name: 'title',
    hint: 'Title',
    status: true
  }, {
    order: 2,
    name: 'company',
    hint: 'Company',
    status: true
  }, {
    order: 3,
    name: 'product',
    hint: 'Product(s)',
    status: true
  }, {
    order: 4,
    name: 'type',
    hint: 'Type(s)',
    status: true
  }, {
    order: 5,
    name: 'lang',
    hint: 'Language(s)',
    status: true
  }, {
    order: 6,
    name: 'ticket',
    hint: 'Ticket(s)',
    status: true
  }]
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
  case 'EDIT_PROPERTY':
    console.log(action.property);
    return {
      ...state,
      documentProperties: [
        ...state.documentProperties.filter(d => d.name !== action.property.name),
        action.property
      ].sort((a, b) => a.order - b.order)
    };
  default:
    return state;
  }
};
