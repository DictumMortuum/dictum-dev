'use strict';

import React from 'react';
import filter from './filter';
import Year from './year';
import Bar from './bar';

export default React.createClass({
  propTypes: {
    docs: React.PropTypes.array
  },

  render() {
    let { docs } = this.props;
    let years = filter(docs, d => d.getFullYear());

    return (
      <div>
        <Bar />
        {years.map((y, index) => {
          return (
            <Year
              key={y.id}
              id={y.id}
              docs={y.docs}
              expanded={index == 0 ? 1 : 0}
            />
          );
        })}
      </div>
    );
  }
});
