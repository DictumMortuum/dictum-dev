'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import { init, Doc } from '../redux/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal500, teal800} from 'material-ui/styles/colors';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';
import Config from './config';
import { flexParent, flexChild } from '../styles/app';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    primary2Color: teal800
  }
});

window.onscroll = function () {
  if (document.body.scrollHeight - document.body.scrollTop === document.body.clientHeight) {
    store.dispatch(Doc.scroll());
  }
};

export default React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentDidMount() {
    store.dispatch(init());
  },

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Bar />
          <Config />
          <div style={flexParent}>
            <div style={{...flexChild, width: '50%'}}>
              <Viewer />
            </div>
            <div style={flexChild}>
              <Editor />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
});
