'use strict';

import React from 'react';
// import Paper from 'material-ui/Paper';
import filter from './filter';
import Year from './year';
import Bar from './bar';
import SimpleMDE from 'react-simplemde-editor';

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
      flexDirection: 'row'
    };

    return (
      <div>
        <Bar />
        <div style={style}>
          <div style={{flex: '1 1 15%', width: '15%' }}>
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
          <div style={{flex: '500 1 70%'}}>
            <SimpleMDE
              options={{
                toolbar: ['bold', 'italic', 'heading', 'strikethrough', '|',
                  'unordered-list', 'ordered-list', 'table', '|',
                  'link', 'image', 'horizontal-rule', 'quote', '|',
                  'preview'],
                indentWithTabs: false,
                spellChecker: false,
                status: false
              }}
            />
          </div>
        </div>
      </div>
    );
  }
});

//           <Paper style={{flex: '1 1 10%'}}>another div content</Paper>
