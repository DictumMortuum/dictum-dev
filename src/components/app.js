'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import Calendar from './calendar/index';
import { toInit } from '../redux/actions/editor';
import { scrollDocs } from '../redux/actions/docs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal500, teal800} from 'material-ui/styles/colors';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    primary2Color: teal800
  }
});

/*
lightBaseTheme:
primary1Color: cyan500,
primary2Color: cyan700,
primary3Color: grey400,
accent1Color: pinkA200,
accent2Color: grey100,
accent3Color: grey500,
textColor: darkBlack,
secondaryTextColor: fade(darkBlack, 0.54),
alternateTextColor: white,
canvasColor: white,
borderColor: grey300,
disabledColor: fade(darkBlack, 0.3),
pickerHeaderColor: cyan500,
clockCircleColor: fade(darkBlack, 0.07),
shadowColor: fullBlack,
*/

window.onscroll = function () {
  if (document.body.scrollHeight - document.body.scrollTop === document.body.clientHeight) {
    store.dispatch(scrollDocs());
  }
};

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
      <MuiThemeProvider muiTheme={muiTheme}>
        <Calendar />
      </MuiThemeProvider>
    );
  }
});
