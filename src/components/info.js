'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import PropTypes from 'prop-types';

export class Info extends React.Component {
  render() {
    return <Snackbar {...this.props.info} autoHideDuration={4000} />;
  }
}

Info.propTypes = {
  info: PropTypes.object
};
