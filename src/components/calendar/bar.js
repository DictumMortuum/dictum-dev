'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { fetchDocs } from '../../redux/actions/docs';
import { toggleDrawer } from '../../redux/actions/config';
import Datepicker from './date';
import moment from 'moment';

let Bar = React.createClass({
  propTypes: {
    date: React.PropTypes.object,
    config: React.PropTypes.object
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
    let { config, date } = this.props;

    return (
      <AppBar
        title={new Date().toLocaleDateString(config.locale, {
          month: 'long', weekday: 'long', day: 'numeric'
        })}
        zDepth={1}
        iconElementRight={
          <div style={{display: 'flex'}}>
            <Datepicker id='from' config={config} date={date.from} callback={this.handleFrom} />
            <Datepicker id='to' config={config} date={date.to} callback={this.handleTo} />
          </div>
        }
        onLeftIconButtonTouchTap={this.handleConfig}
      />
    );
  }
});

export default connect(state => {
  return {
    date: state.date,
    config: state.config
  };
})(Bar);
