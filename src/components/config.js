'use strict';

import React from 'react';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { Config } from '../redux/actions';
import { createSelector } from 'reselect';
import SaveConfig from './buttons/saveConfig';

class Conf extends React.Component {
  render() {
    let { onToggle, config, toggle } = this.props;
    return (
      <Drawer open={toggle.drawer} openSecondary={true}>
        <div style={{padding: 8}}>
          <h2>Editor</h2>
          {config.documentProperties.map(p => (
            <Toggle defaultToggled={p.status} key={p.name}
            label={p.name} onToggle={(event, isInputChecked) => {
              onToggle({...p, status: isInputChecked});
            }} />
          ))}
          <SaveConfig />
        </div>
      </Drawer>
    );
  }
}

Conf.propTypes = {
  config: PropTypes.object,
  toggle: PropTypes.object,
  onToggle: PropTypes.func
};

const mapStateToProps = state => ({
  config: state.config,
  toggle: state.toggle
});

const mapDispatchToProps = {
  edit: Config.editProperty
};

const mergeProps = createSelector(
  state => state.config,
  state => state.toggle,
  (state, actions) => actions.edit,
  (config, toggle, edit) => ({
    config,
    toggle,
    onToggle: edit
  })
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Conf);
