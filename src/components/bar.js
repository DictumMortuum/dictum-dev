'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { Doc, Config } from '../redux/actions';
import Datepicker from './datepicker';
import moment from 'moment';
import { flexParent } from '../styles';
import { createSelector } from 'reselect';

let Bar = React.createClass({
  propTypes: {
    date: React.PropTypes.object,
    handleFrom: React.PropTypes.func,
    handleTo: React.PropTypes.func,
    toggleDrawer: React.PropTypes.func,
    title: React.PropTypes.string
  },

  render() {
    let { date, title, handleFrom, handleTo, toggleDrawer } = this.props;

    return (
      <AppBar
        style={{position: 'fixed'}}
        title={title}
        zDepth={1}
        iconElementRight={
          <div style={flexParent}>
            <Datepicker id='from' date={date.from} callback={handleFrom} />
            <Datepicker id='to' date={date.to} callback={handleTo} />
          </div>
        }
        onLeftIconButtonTouchTap={toggleDrawer}
      />
    );
  }
});

const mapStateToProps = state => ({
  date: state.date,
  config: state.config
});

const mapDispatchToProps = {
  bulk: Doc.bulk,
  toggle: Config.editor
};

const mergeProps = createSelector(
  state => state.date,
  state => state.config,
  (state, actions) => actions.bulk,
  (state, actions) => actions.toggle,
  (date, config, bulk, toggle) => ({
    date,
    title: new Date().toLocaleDateString(config.locale, {
      month: 'long', weekday: 'long', day: 'numeric'
    }),
    handleFrom: (event, from) => bulk({
      startkey: moment(from).startOf('day').toISOString(),
      endkey: date.to
    }),
    handleTo: (event, to) => bulk({
      startkey: date.from,
      endkey: moment(to).endOf('day').toISOString()
    }),
    toggleDrawer: toggle
  })
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bar);
