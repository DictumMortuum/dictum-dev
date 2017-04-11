'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

class tpl extends React.Component {
  render() {
    return (<Snackbar {...this.props.info} autoHideDuration={4000} />);
  }
}

tpl.propTypes = {
  info: React.PropTypes.object
};

export default connect(state => ({ info: state.info }))(tpl);
