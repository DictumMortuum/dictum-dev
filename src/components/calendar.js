'use strict';

import React from 'react';
import filter from '../filter';
import year from './year';

export default React.createClass({
  propTypes: {
    docs: React.PropTypes.object
  },

  render() {
    let { docs } = this.props;
    let years = filter(docs, 'YYYY');

    return (
      <div>
        {years.map(y => {
          return (
            <year key={y.id} docs={y.docs} />
          );
        })}
      </div>
    );
  }
});
