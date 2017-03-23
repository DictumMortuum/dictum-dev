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
import Config from './config';
import Info from './info';
import { palette, appStyle, flexParent, flexChild } from '../styles';
import { connect } from 'react-redux';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: palette
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
    let viewerStyle = {...flexChild, width: '50%'};

    if (config.editor === false) {
      viewerStyle = {...flexChild, width: '100%'};
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={appStyle}>
          <Bar />
          <Config />
            <div style={flexParent}>
              <div style={viewerStyle}>
                <Viewer />
              </div>
              {config.editor && <div style={flexChild}>
                <Editor />
              </div>}
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
