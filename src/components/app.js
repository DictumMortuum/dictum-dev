'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import { init } from '../redux/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';
import Info from './info';
import { palette } from '../styles';
import { connect } from 'react-redux';

injectTapEventPlugin();

const muiTheme = getMuiTheme({ palette });

const style = {
  display: 'flex',
  backgroundColor: palette.accent2Color,
  justifyContent: 'space-between',
  padding: 5,
  height: '85%',
  flexWrap: 'wrap'
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
        <div style={{height: '100vh'}}>
          <div style={style}>
            <Bar />
            <Viewer />
            <Editor />
          </div>
          <Info />
        </div>
      </MuiThemeProvider>
    );
  }
});

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(App);
