'use strict';

import React from 'react';
import filter from './filter';
import Month from './month';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    docs: React.PropTypes.array
  },

  render() {
    let { id, docs } = this.props;
    let months = filter(docs, 'M');

    return (
      <div>
        {months.map(m => {
          return (
            <Month key={m.id} id={m.id} year={id} docs={m.docs} />
          );
        })}
      </div>
    );
  }
});
