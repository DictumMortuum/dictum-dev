'use strict';

import React from 'react';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';

let Config = React.createClass({
  propTypes: {
    config: React.PropTypes.object
  },

  render() {
    return (
      <Drawer
        open={this.props.config.drawer}
        openSecondary={true}
      >
        dasf
      </Drawer>
    );
  }
});

export default connect(state => {
  return {
    config: state.config
  };
})(Config);
