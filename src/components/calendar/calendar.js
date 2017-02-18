'use strict';

import React from 'react';
import filter from './filter';
import Year from './year';
import { connect } from 'react-redux';

let Calendar = React.createClass({
  propTypes: {
    docs: React.PropTypes.array
  },

  render() {
    let { docs } = this.props;
    let years = filter(docs, d => d.getFullYear());

    return (
      <div>
        {years.map((y, index) => {
          return (
            <Year key={y.id} id={y.id} docs={y.docs}
              expanded={index === 0 ? true : false}
              style={{padding: 0}}
            />
          );
        })}
      </div>
    );
  }
});

export default connect(state => {
  return {
    docs: state.docs.docs,
    config: state.config
  };
})(Calendar);
