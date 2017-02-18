'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import Calendar from './calendar/index';
import { toInit } from '../redux/actions/editor';

import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object,
    docs: React.PropTypes.array,
    tags: React.PropTypes.array,
    config: React.PropTypes.object,
    history: React.PropTypes.object,
    location: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    store.dispatch(toInit());
  },

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Calendar />
      </MuiThemeProvider>
    );
  }
});
