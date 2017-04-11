'use strict';

import React from 'react';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';

class tpl extends React.Component {
  render() {
    return (<Drawer open={this.props.config.drawer} openSecondary={true} />);
  }
}

tpl.propTypes = {
  config: React.PropTypes.object
};

export default connect(state => ({ config: state.config }))(tpl);
