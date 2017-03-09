'use strict';

import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';

let Datepicker = React.createClass({
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
        name={id}
        style={{paddingRight: 10}}
        textFieldStyle={{width: 120}}
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

export default connect(state => {
  return {
    config: state.config
  };
})(Datepicker);
