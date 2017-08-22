'use strict';

import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Config } from '../../redux/actions';
import { ToggleDocProperties } from '../../components/buttons';

class tpl extends React.Component {
  render() {
    return <ToggleDocProperties {...this.props} />;
  }
}

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
)(tpl);
