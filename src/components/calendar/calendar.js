'use strict';

import React from 'react';
// import Paper from 'material-ui/Paper';
import filter from './filter';
import Year from './year';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';

export default React.createClass({
  propTypes: {
    docs: React.PropTypes.array
  },

  render() {
    let { docs } = this.props;
    let years = filter(docs, d => d.getFullYear());
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
            {years.map((y, index) => {
              return (
                <Year
                  key={y.id}
                  id={y.id}
                  docs={y.docs}
                  expanded={index === 0 ? 1 : 0}
                />
              );
            })}
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
