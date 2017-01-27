'use strict';

import React from 'react';
import { connect } from 'react-redux';

let Bar = React.createClass({
  propTypes: {
    date: React.PropTypes.array
  },

  getMinDate() {
    // TODO handle empty or null arrays.
    return this.props.date[0];
  },

  getMaxDate() {
    // TODO handle empty or null arrays.
    return this.props.date[this.props.date.length - 1];
  },

  render() {
    let { date } = this.props;

    return (
      <div>
        <div>min: {this.getMinDate()}</div>
        <div>max: {this.getMaxDate()}</div>
      </div>
    );
  }
});

export default connect(state => {
  return {
    date: state.date
  };
})(Bar);
