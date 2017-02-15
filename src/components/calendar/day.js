'use strict';

import React from 'react';
import { dayStyle } from '../../styles/app';
import { Card, CardHeader } from 'material-ui/Card';
import { connect } from 'react-redux';

let Day = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    month: React.PropTypes.string,
    docs: React.PropTypes.array,
    config: React.PropTypes.object
  },

  render() {
    let { id, year, month, config } = this.props;
    // determine whether we need to sort docs or not here.
    let date = new Date(Date.UTC(year, month - 1, id, 0, 0, 0));
    let options = { month: 'short', day: 'numeric', weekday: 'long' };
    let locale = config.locale;

    return (
      <Card zDepth={0}>
        <CardHeader
          style={dayStyle}
          title={date.toLocaleDateString(locale, options)}
        />
      </Card>
    );
  }
});

export default connect(state => {
  return {
    config: state.config
  };
})(Day);
