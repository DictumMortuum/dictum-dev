'use strict';

import React from 'react';
import filter from '../filter';
import month from './month';

export default React.createClass({
  propTypes: {
    docs: React.PropTypes.object
  },

  render() {
    let { docs } = this.props;
    let months = filter(docs, 'M');

    return (
      <div>
        {months.map(m => {
          return (
            <month key={m.id} docs={m.docs} />
          );
        })}
      </div>
    );
  }
});
