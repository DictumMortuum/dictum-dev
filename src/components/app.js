'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import Calendar from './calendar/calendar';
import { connect } from 'react-redux';
import { fetchDocs } from '../redux/actions/docs';
import { fetchConfig } from '../redux/actions/config';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

let App = React.createClass({
  propTypes: {
    children: React.PropTypes.object,
    docs: React.PropTypes.array,
    config: React.PropTypes.object,
    history: React.PropTypes.object,
    location: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    store.dispatch(fetchDocs());
    store.dispatch(fetchConfig('dictum_config'));
  },

  render() {
    let { docs } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Calendar docs={docs} />
      </MuiThemeProvider>
    );
  }
});

export default connect(state => {
  return {
    docs: state.docs,
    config: state.config
  };
})(App);
