'use strict';

import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class tpl extends React.Component {
  render() {
    return (
      <DatePicker
        {...this.props}
        style={{paddingRight: 10}}
        textFieldStyle={{width: 120}}
        inputStyle={{color: 'white'}}
        DateTimeFormat={global.Intl.DateTimeFormat}
        autoOk={true}
        container="inline"
      />
    );
  }
}

export default connect(
  (state, props) => ({
    props,
    config: state.config,
    date: state.date
  }),
  {},
  createSelector(
    state => state.props,
    state => state.config,
    state => state.date,
    (props, config, date) => ({
      key: props.id,
      name: props.id,
      locale: config.locale,
      value: new Date(props.date),
      onChange: props.callback,
      minDate: date.minDate,
      maxDate: date.maxDate
    })
  )
)(tpl);
