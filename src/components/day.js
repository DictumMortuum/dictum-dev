'use strict';

import React from 'react';
import filter from '../filter';
import doc from './doc';

export default React.createClass({
  propTypes: {
    docs: React.PropTypes.object
  },

  render() {
    let { docs } = this.props;
    // determine whether we need to sort docs or not here.

    return (
      <div>
        {docs.map(d => {
          return (
            <doc key={d.id} docs={d.docs} />
          );
        })}
      </div>
    );
  }
});
