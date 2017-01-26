'use strict';

import React from 'react';
import filter from './filter';
import Year from './year';

export default React.createClass({
  propTypes: {
    docs: React.PropTypes.array
  },

  render() {
    let { docs } = this.props;
    let years = filter(docs, 'YYYY');

    return (
      <div>
        {years.map(y => {
          return (
            <Year key={y.id} id={y.id} docs={y.docs} />
          );
        })}
      </div>
    );
  }
});
