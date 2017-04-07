'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import { init, Doc } from '../redux/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';
// import Config from './config';
import Info from './info';
import { palette } from '../styles';
import { connect } from 'react-redux';

injectTapEventPlugin();

const muiTheme = getMuiTheme({ palette });

const style = {
  display: 'flex',
  backgroundColor: palette.accent2Color,
  justifyContent: 'space-between',
  padding: 5
};

window.onscroll = function () {
  if (document.body.scrollHeight - document.body.scrollTop === document.body.clientHeight) {
    store.dispatch(Doc.scroll());
  }
};

let App = React.createClass({
  propTypes: {
    config: React.PropTypes.object
  },

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
          <Info />
          <div style={style}>
            <Viewer />
            <Editor />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
});

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(App);
