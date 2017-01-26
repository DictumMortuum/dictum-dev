'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import Calendar from './calendar/calendar';
import { connect } from 'react-redux';
import { fetchDocs } from '../redux/actions/docs';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

let App = React.createClass({
  propTypes: {
    children: React.PropTypes.object,
    docs: React.PropTypes.array,
    history: React.PropTypes.object,
    location: React.PropTypes.object
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    store.dispatch(fetchDocs());
  },

  render() {
    let { docs } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Calendar docs={docs} />
      </MuiThemeProvider>
    );
  }
});

export default connect(mapStateToProps)(App);

function mapStateToProps(state) {
  return {
    docs: state.docs
  };
}
