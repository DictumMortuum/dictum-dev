'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Info extends React.Component {
  render() {
    return (<Snackbar {...this.props.info} autoHideDuration={4000} />);
  }
}

Info.propTypes = {
  info: PropTypes.object
};

export default connect(state => ({ info: state.info }))(Info);
