'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { Doc, Config } from '../redux/actions';
import Datepicker from './datepicker';
import { flexParent } from '../styles';
import { createSelector } from 'reselect';
import { startOfDay, endOfDay } from 'date-utils';
import { SearchText } from './text';

let Bar = React.createClass({
  propTypes: {
    date: React.PropTypes.object,
    handleFrom: React.PropTypes.func,
    handleTo: React.PropTypes.func,
    toggleDrawer: React.PropTypes.func,
    title: React.PropTypes.string,
    term: React.PropTypes.string
  },

  render() {
    let { date, title, term, handleFrom, handleTo, toggleDrawer } = this.props;

    return (
      <AppBar
        style={{position: 'fixed'}}
        title={title}
        zDepth={1}
        iconElementRight={
          <div style={flexParent}>
            <Datepicker id='from' date={date.from} callback={handleFrom} />
            <Datepicker id='to' date={date.to} callback={handleTo} />
            <SearchText id='search' key='search' hint='Search...' value={term} />
          </div>
        }
        onLeftIconButtonTouchTap={toggleDrawer}
      />
    );
  }
});

const mapStateToProps = state => ({
  date: state.date,
  config: state.config,
  search: state.search
});

const mapDispatchToProps = {
  bulk: Doc.bulk,
  toggle: Config.editor
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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bar);
