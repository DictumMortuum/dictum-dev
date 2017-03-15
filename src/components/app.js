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
import Info from './info';
import { flexParent, flexChild } from '../styles';
import { connect } from 'react-redux';

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
    let { config } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Bar />
          <Config />
            {config.editor === true ?
              <div style={flexParent}>
                <div style={{...flexChild, width: '50%'}}>
                  <Viewer />
                </div>
                <div style={flexChild}>
                  <Editor />
                </div>
              </div>
            :
            <div style={flexParent}>
              <div style={{...flexChild, width: '100%'}}>
                <Viewer />
              </div>
            </div>}
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
