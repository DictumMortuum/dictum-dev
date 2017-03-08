'use strict';

import React from 'react';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';
import Config from './config';
import { calendarStyle } from '../styles/app';

export default React.createClass({
  render() {
    return (
      <div>
        <Bar />
        <Config />
        <div style={calendarStyle}>
          <div style={{flex: '1 0 50%', width: '50%'}}>
            <Viewer />
          </div>
          <div style={{flex: '1 0 50%', width: '50%'}}>
            <Editor />
          </div>
        </div>
      </div>
    );
  }
});
