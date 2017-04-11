'use strict';

import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Config } from '../../redux/actions';

class tpl extends React.Component {
  render() {
    return (
      <IconButton {...this.props}>
        <ActionVisibility />
      </IconButton>
    );
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
