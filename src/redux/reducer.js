'use strict';

const defaultState = {
  docs: [],
  config: {
    locale: 'en',
    company: ['openbet'],
    product: [{
      name: 'siteserver',
      jira: 'OBSS',
      lang: ['java', 'activemq', 'solr', 'jboss', 'tomcat']
    },{
      name: 'sitebuilder',
      jira: 'OBSB',
      lang: ['php', 'drupal', 'mysql']
    },{
      name: 'pmu',
      jira: 'PMU',
      lang: ['tcl', 'informix', 'sql']
    }]
  }
}

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'FETCH':
    return {
      ...state,
      docs: action.docs
    };
  case 'DELETE':
    return {
      ...state,
      docs: state.docs.filter(doc => doc.id !== action.id)
    };
  case 'INSERT':
    return {
      ...state,
      docs: [...state.docs, action.doc]
    };
  case 'UPDATE':
    return state;
  case 'CONFIG':
    return {
      ...state,
      config: action.doc
    };
  case 'CONFIG_DEFAULT':
    return {
      ...state,
      config: defaultState.config
    };
  default:
    return state;
  }
};
