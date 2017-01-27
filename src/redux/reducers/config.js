'use strict';

const defaultState = {
  locale: 'gr-el',
  company: ['openbet', 'unify'],
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
    default:
      return state;
  }
};