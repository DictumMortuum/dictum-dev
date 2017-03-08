'use strict';

import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    date: React.PropTypes.string,
    config: React.PropTypes.object,
    callback: React.PropTypes.func
  },

  render() {
    let { id, date, config, callback } = this.props;

    return (
      <DatePicker
        key={id}
        style={{paddingRight: 10}}
        inputStyle={{color: 'white'}}
        locale={config.locale}
        DateTimeFormat={global.Intl.DateTimeFormat}
        autoOk={true}
        container="inline"
        value={new Date(date)}
        onChange={callback}
      />
    );
  }
});
