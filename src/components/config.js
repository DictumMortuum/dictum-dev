'use strict';

import React from 'react';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { Config } from '../redux/actions';
import { createSelector } from 'reselect';

class tpl extends React.Component {
  render() {
    let { onToggle, config } = this.props;
    return (
      <Drawer open={config.drawer} openSecondary={true}>
        <div style={{padding: 8}}>
          <h2>Editor</h2>
          {config.documentProperties.sort((a, b) => a.order - b.order).map(p => (
            <Toggle defaultToggled={p.status} key={p.name}
            label={p.name} onToggle={(event, isInputChecked) => {
              console.log(p);
              onToggle({...p, status: isInputChecked});
            }} />
          ))}
        </div>
      </Drawer>
    );
  }
}

tpl.propTypes = {
  config: PropTypes.object,
  onToggle: PropTypes.func
};

const mapStateToProps = state => ({
  config: state.config
});

const mapDispatchToProps = {
  edit: Config.editProperty
};

const mergeProps = createSelector(
  state => state.config,
  (state, actions) => actions.edit,
  (config, edit) => ({
    config,
    onToggle: edit
  })
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(tpl);
