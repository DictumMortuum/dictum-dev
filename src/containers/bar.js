'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Doc, Config } from '../redux/actions';
import { createSelector } from 'reselect';
import { startOfDay, endOfDay } from 'date-utils';
import { Bar } from '../components/bar';

class BarContainer extends React.Component {
  render() {
    return <Bar {...this.props} />;
  }
}

const mapStateToProps = state => ({
  date: state.date,
  config: state.config,
  search: state.search
});

const mapDispatchToProps = {
  bulk: Doc.bulk,
  toggle: Config.drawer
};

const mergeProps = createSelector(
  state => state.date,
  state => state.config,
  state => state.search,
  (state, actions) => actions.bulk,
  (state, actions) => actions.toggle,
  (date, config, search, bulk, toggle) => ({
    date,
    term: search.term,
    title: new Date().toLocaleDateString(config.locale, {
      month: 'long', weekday: 'long', day: 'numeric'
    }),
    handleFrom: (event, from) => bulk({
      startkey: startOfDay(from).toISOString(),
      endkey: date.to
    }),
    handleTo: (event, to) => bulk({
      startkey: date.from,
      endkey: endOfDay(to).toISOString()
    }),
    toggleDrawer: toggle
  })
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(BarContainer);
