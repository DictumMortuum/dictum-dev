'use strict';

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

let Info = React.createClass({
  propTypes: {
    info: React.PropTypes.object
  },

  render() {
    let { info } = this.props;

    return (
      <Snackbar
        open={info.open}
        message={info.desc}
        autoHideDuration={4000}
      />
    );
  }
});

export default connect(state => ({ info: state.info }))(Info);
