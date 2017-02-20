'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import store from '../../redux/store';
import { fetchDocs } from '../../redux/actions/docs';
import { toggleDrawer } from '../../redux/actions/config';
import moment from 'moment';

let Bar = React.createClass({
  propTypes: {
    date: React.PropTypes.object,
    config: React.PropTypes.object
  },

  getDatePicker(date, callback) {
    return (
      <DatePicker
        style={{paddingRight: 10}}
        inputStyle={{color: 'white'}}
        locale={this.props.config.locale}
        DateTimeFormat={global.Intl.DateTimeFormat}
        autoOk={true}
        container="inline"
        value={new Date(date)}
        onChange={callback}
      />
    );
  },

  handleFrom(_, date) {
    store.dispatch(fetchDocs({
      startkey: moment(date).startOf('day').toISOString(),
      endkey: this.props.date.to
    }));
  },

  handleTo(_, date) {
    store.dispatch(fetchDocs({
      startkey: this.props.date.from,
      endkey: moment(date).endOf('day').toISOString()
    }));
  },

  handleConfig() {
    store.dispatch(toggleDrawer());
  },

  render() {
    return (
      <AppBar
        title='Dictum'
        zDepth={1}
        style={{backgroundColor: '#00695C'}}
        iconElementRight={
          <div style={{display: 'flex'}}>
            {this.getDatePicker(this.props.date.from, this.handleFrom)}
            {this.getDatePicker(this.props.date.to, this.handleTo)}
          </div>
        }
        onLeftIconButtonTouchTap={this.handleConfig}
      />
    );
  }
});

export default connect(state => {
  return {
    docs: state.docs.docs,
    date: state.docs.date,
    config: state.config
  };
})(Bar);
