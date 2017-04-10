'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import RaisedButton from 'material-ui/RaisedButton';
import { font } from '../../styles';

let Jira = React.createClass({
  render() {
    return (<RaisedButton key='ticket' {...this.props} />);
  }
});

const mapStateToProps = state => ({
  editor: state.editor,
  config: state.config
});

const mergeProps = createSelector(
  state => state.editor,
  state => state.config,
  (editor, config) => ({
    label: editor.ticket,
    href: config.jiraPrefix + 'browse/' + editor.ticket,
    labelStyle: font,
    primary: true
  })
);

export default connect(mapStateToProps, {}, mergeProps)(Jira);
