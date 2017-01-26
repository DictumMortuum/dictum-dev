'use strict';

import React from 'react';
import Doc from './doc';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    month: React.PropTypes.string,
    docs: React.PropTypes.array
  },

  render() {
    let { id, year, month, docs } = this.props;
    // determine whether we need to sort docs or not here.
    let date = new Date(Date.UTC(year, month - 1, id, 0, 0, 0));
    let options = { month: 'short', day: 'numeric', weekday: 'long' };
    // TODO this in config
    let locale = 'gr-el';

    return (
      <div>
        <h3>{date.toLocaleDateString(locale, options)}</h3>
        <div>
          {docs.map(d => {
            return (
              <Doc
                key={d._id}
                date={d._id}
                ticket={d.ticket}
                company={d.company}
                product={d.product}
                type={d.type}
                lang={d.lang}
                desc={d.desc}
              />
            );
          })}
        </div>
      </div>
    );
  }
});
