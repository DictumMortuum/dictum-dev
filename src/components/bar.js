'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import store from '../redux/store';
import { Doc, Config } from '../redux/actions';
import Datepicker from './date';
import moment from 'moment';
import { flexParent } from '../styles';

let Bar = React.createClass({
  propTypes: {
    date: React.PropTypes.object,
    config: React.PropTypes.object
  },

  handleFrom(event, date) {
    store.dispatch(Doc.bulk({
      startkey: moment(date).startOf('day').toISOString(),
      endkey: this.props.date.to
    }));
  },

  handleTo(event, date) {
    store.dispatch(Doc.bulk({
      startkey: this.props.date.from,
      endkey: moment(date).endOf('day').toISOString()
    }));
  },

  handleConfig() {
    store.dispatch(Config.drawer());
  },

  render() {
    let { config, date } = this.props;

    return (
      <AppBar
        style={{position: 'fixed'}}
        title={new Date().toLocaleDateString(config.locale, {
          month: 'long', weekday: 'long', day: 'numeric'
        })}
        zDepth={1}
        iconElementRight={
          <div style={flexParent}>
            <Datepicker id='from' date={date.from} callback={this.handleFrom} />
            <Datepicker id='to' date={date.to} callback={this.handleTo} />
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
