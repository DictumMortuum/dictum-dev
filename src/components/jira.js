'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import RaisedButton from 'material-ui/RaisedButton';
import { font } from '../styles';

let Jira = React.createClass({
  propTypes: {
    ticket: React.PropTypes.string,
    prefix: React.PropTypes.string,
    status: React.PropTypes.object
  },

  render() {
    let { ticket, prefix } = this.props;

    return (<RaisedButton
      primary={true}
      key='ticket'
      label={ticket}
      href={prefix}
      labelStyle={font}
    />);
  }
});

const mapStateToProps = (state, props) => ({
  props,
  config: state.config
});

const mergeProps = createSelector(
  state => state.props,
  state => state.config,
  (props, config) => ({
    ticket: props.ticket,
    prefix: config.jiraPrefix + 'browse/' + props.ticket
  })
);

export default connect(mapStateToProps, {}, mergeProps)(Jira);
