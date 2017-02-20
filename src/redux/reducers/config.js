'use strict';

const defaultState = {
  locale: 'el-gr',
  expandedDay: true,
  expandedDoc: false,
  company: ['openbet', 'unify'],
  drawer: false,
  product: [{
    company: 'openbet',
    name: 'siteserver',
    jira: 'OBSS',
    lang: ['java', 'activemq', 'solr', 'jboss', 'tomcat']
  }, {
    company: 'openbet',
    name: 'sitebuilder',
    jira: 'OBSB',
    lang: ['php', 'drupal', 'mysql']
  }, {
    company: 'openbet',
    name: 'pmu',
    jira: 'PMU',
    lang: ['tcl', 'informix', 'sql']
  }, {
    company: 'unify',
    name: 'openscape voice',
    jira: 'OSV',
    lang: []
  }]
};

export default (state=defaultState, action) => {
  switch (action.type) {
  case 'CONFIG':
    return action.doc;
  case 'CONFIG_DEFAULT':
    return defaultState;
  case 'TOGGLE_DRAWER':
    return Object.assign({}, state, { drawer: !state.drawer });
  default:
    return state;
  }
};
