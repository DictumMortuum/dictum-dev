'use strict';

const defaultState = {
  locale: 'en',
  jiraPrefix: 'https://jira.dev.global-intra.net:8443/',
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
  case 'EDIT_PROPERTY':
    return {
      ...state,
      documentProperties: [
        ...state.documentProperties.filter(d => d.name !== action.property.name),
        action.property
      ].sort((a, b) => a.order - b.order)
    };
  case 'EDIT_JIRA':
    return {
      ...state,
      jiraPrefix: action.jira
    };
  default:
    return state;
  }
};
