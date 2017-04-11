'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { Doc, Config } from '../redux/actions';
import Datepicker from './datepicker';
import { flexParent } from '../styles';
import { createSelector } from 'reselect';
import { startOfDay, endOfDay } from 'date-utils';
import PropTypes from 'prop-types';

class tpl extends React.Component {
  render() {
    let { date, title, handleFrom, handleTo, toggleDrawer } = this.props;

    return (
      <AppBar
        title={title}
        zDepth={1}
        style={{margin: 3}}
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
}

tpl.propTypes = {
  date: PropTypes.object,
  handleFrom: PropTypes.func,
  handleTo: PropTypes.func,
  toggleDrawer: PropTypes.func,
  title: PropTypes.string
};

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

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(tpl);
