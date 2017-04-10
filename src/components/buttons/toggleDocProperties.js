'use strict';

import React from 'react';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Config } from '../../redux/actions';

let template = React.createClass({
  render() {
    return (
      <IconButton {...this.props}>
        <Settings />
      </IconButton>
    );
  }
});

const mapStateToProps = state => ({
  config: state.config
});

const mapDispatchToProps = {
  properties: () => Config.properties()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    (state, actions) => actions.properties,
    toggle => ({
      onTouchTap: toggle
    })
  )
)(template);
