'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import RaisedButton from 'material-ui/RaisedButton';
import { font } from '../../styles';

class tpl extends React.Component {
  render() {
    return (<RaisedButton key='ticket' {...this.props} />);
  }
}

const mapStateToProps = (state, props) => ({
  props,
  config: state.config
});

const mergeProps = createSelector(
  state => state.props,
  state => state.config,
  (props, config) => ({
    label: props.ticket,
    href: config.jiraPrefix + 'browse/' + props.ticket,
    labelStyle: font,
    primary: true
  })
);

export default connect(mapStateToProps, {}, mergeProps)(tpl);
