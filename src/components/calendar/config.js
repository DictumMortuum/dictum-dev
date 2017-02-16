'use strict';

import React from 'react';
// import store from '../../redux/store';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';

let Config = React.createClass({
  getInitialState() {
    return {
      open: false
    };
  },

  handleToggle() {
    this.setState({ open: !this.state.open });
  },

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
});

export default connect(state => {
  return {
    docs: state.docs.docs,
    date: state.docs.date,
    config: state.config
  };
})(Config);
