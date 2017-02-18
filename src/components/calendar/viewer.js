'use strict';

import React from 'react';
import { List } from 'material-ui/List';
import Doc from './doc';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

let Viewer = React.createClass({
  propTypes: {
    editor: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { editor, config } = this.props;
    let date = new Date();

    if (editor.docs.length > 0) {
      date = editor.doc.date;
    }

    return (
      <Paper zDepth={0} style={{padding: 10}} >
        <h3 style={{textAlign: 'center'}}>
          {new Date(date).toLocaleDateString(config.locale, {
            month: 'long', weekday: 'long', day: 'numeric'
          })}
        </h3>
        <List>
          {editor.docs.map(d => {
            return (
              <div key={d._id} style={{marginBottom: 10}}>
                <Doc
                  doc={d} config={config}
                />
              </div>
            );
          }
          )}
        </List>
      </Paper>
    );
  }
});

export default connect(state => {
  return {
    editor: state.editor,
    config: state.config
  };
})(Viewer);
