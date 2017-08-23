'use strict';

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { palette } from '../styles';
import PropTypes from 'prop-types';

const muiTheme = getMuiTheme({ palette });

const style = {
  display: 'flex',
  backgroundColor: palette.accent2Color,
  justifyContent: 'space-between',
  height: '85%',
  padding: 3,
  flexWrap: 'wrap'
};

export class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{height: '100vh'}}>
          <div style={style}>
            {this.props.children}
          </div>
          {this.props.info}
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  info: PropTypes.object,
  children: PropTypes.object
};

App.childContextTypes = {
  muiTheme: PropTypes.object
};
