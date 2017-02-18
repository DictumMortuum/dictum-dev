'use strict';

import React from 'react';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';
import Calendar from './calendar';

export default React.createClass({
  render() {
    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      height: '100vh'
    };

    return (
      <div>
        <Bar />
        <div style={style}>
          <div style={{flex: '1 1' }}>
            <Calendar />
          </div>
          <div style={{flex: '4 1' }}>
            <Viewer />
          </div>
          <div style={{flex: '4 1'}}>
            <Editor />
          </div>
        </div>
      </div>
    );
  }
});
