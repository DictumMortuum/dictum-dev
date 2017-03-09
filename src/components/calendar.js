'use strict';

import React from 'react';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';
import Config from './config';
import { flexParent, flexChild } from '../styles/app';

export default React.createClass({
  render() {
    return (
      <div>
        <Bar />
        <Config />
        <div style={flexParent}>
          <div style={flexChild}>
            <Viewer />
          </div>
          <div style={flexChild}>
            <Editor />
          </div>
        </div>
      </div>
    );
  }
});
