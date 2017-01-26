'use strict';

const defaultState = {
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
