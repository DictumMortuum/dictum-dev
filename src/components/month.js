'use strict';

import React from 'react';
import filter from '../filter';
import day from './day';

export default React.createClass({
  propTypes: {
    docs: React.PropTypes.object
  },

  render() {
    let { docs } = this.props;
    let days = filter(docs, 'D');

    return (
      <div>
        {days.map(d => {
          return (
            <day key={d.id} docs={d.docs} />
          );
        })}
      </div>
    );
  }
});
