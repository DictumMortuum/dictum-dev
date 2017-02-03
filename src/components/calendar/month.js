'use strict';

import React from 'react';
import filter from './filter';
import Day from './day';
import { monthStyle } from '../../styles/app';
import { Card, CardHeader } from 'material-ui/Card';
import { connect } from 'react-redux';

let Month = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    docs: React.PropTypes.array,
    config: React.PropTypes.object
  },

  render() {
    let { id, year, docs, config } = this.props;
    let days = filter(docs, d => d.getDate());
    let date = new Date(Date.UTC(year, id, 0, 0, 0, 0));
    let options = { year: 'numeric', month: 'long' };
    let locale = config.locale;

    return (
      <Card>
        <CardHeader
          style={monthStyle}
          title={date.toLocaleDateString(locale, options)}
        />
        <div>
          {days.map(d => {
            return (
              <Day key={d.id} id={d.id} year={year} month={id} docs={d.docs} />
            );
          })}
        </div>
      </Card>
    );
  }
});

export default connect(state => {
  return {
    config: state.config
  };
})(Month);
