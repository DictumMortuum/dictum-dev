'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Info } from '../components/info';

class InfoContainer extends React.Component {
  render() {
    return <Info {...this.props} />;
  }
}

export default connect(state => ({ info: state.info }))(InfoContainer);
