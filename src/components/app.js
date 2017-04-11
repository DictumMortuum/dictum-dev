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
import PropTypes from 'prop-types';

injectTapEventPlugin();

const muiTheme = getMuiTheme({ palette });

const style = {
  display: 'flex',
  backgroundColor: palette.accent2Color,
  justifyContent: 'space-between',
  height: '85%',
  padding: 3,
  flexWrap: 'wrap'
};

class tpl extends React.Component {
  componentDidMount() {
    store.dispatch(init());
  }

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
}

tpl.childContextTypes = {
  muiTheme: PropTypes.object
};

tpl.propTypes = {
  config: PropTypes.object
};

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(tpl);
