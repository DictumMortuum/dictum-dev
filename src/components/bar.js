'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Datepicker from './datepicker';
import { flexParent } from '../styles';
import PropTypes from 'prop-types';

export class Bar extends React.Component {
  render() {
    let { date, title, handleFrom, handleTo, toggleDrawer } = this.props;

    return (
      <AppBar
        title={title}
        zDepth={1}
        style={{margin: 3}}
        iconElementRight={
          <div style={flexParent}>
            <Datepicker id='from' date={date.from} callback={handleFrom} />
            <Datepicker id='to' date={date.to} callback={handleTo} />
          </div>
        }
        onLeftIconButtonTouchTap={toggleDrawer}
      />
    );
  }
}

Bar.propTypes = {
  date: PropTypes.object,
  handleFrom: PropTypes.func,
  handleTo: PropTypes.func,
  toggleDrawer: PropTypes.func,
  title: PropTypes.string
};
