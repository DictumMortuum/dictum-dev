'use strict';

import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Config } from '../../redux/actions';
import { ToggleEditor } from '../../components/buttons';

class tpl extends React.Component {
  render() {
    return <ToggleEditor {...this.props} />;
  }
}

const mapStateToProps = state => ({
  config: state.config
});

const mapDispatchToProps = {
  toggle: () => Config.editor()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    (state, actions) => actions.toggle,
    toggle => ({
      onTouchTap: toggle
    })
  )
)(tpl);
