'use strict';

import React from 'react';
import filter from './filter';
import Day from './day';
// import css from '../../styles/app';
import {Card, CardHeader } from 'material-ui/Card';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    docs: React.PropTypes.array
  },

  render() {
    let { id, year, docs } = this.props;
    let days = filter(docs, 'D');
    let date = new Date(Date.UTC(year, id, 0, 0, 0, 0));
    let options = { year: 'numeric', month: 'long' };
    // TODO this in config
    let locale = 'gr-el';
/*
    return (
      <div>
        <h3 style={css.month}>{date.toLocaleDateString(locale, options)}</h3>
        <div>
          {days.map(d => {
            return (
              <Day key={d.id} id={d.id} year={year} month={id} docs={d.docs} />
            );
          })}
        </div>
      </div>
    );
*/
    return (
      <Card>
        <CardHeader title={date.toLocaleDateString(locale, options)} />
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
