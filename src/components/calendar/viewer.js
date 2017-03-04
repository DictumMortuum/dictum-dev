'use strict';

import React from 'react';
import { List } from 'material-ui/List';
import Doc from './doc';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

let Viewer = React.createClass({
  propTypes: {
    docs: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { docs, config } = this.props;

    return (
      <Paper zDepth={0} style={{padding: 10}} >
        <List>
          {docs.docs.slice(0, docs.length).map((d, index) => {
            return (
              <div key={d._id} style={{marginBottom: 10}}>
                <Doc
                  doc={d} config={config} index={index}
                />
              </div>
            );
          })}
        </List>
      </Paper>
    );
  }
});

export default connect(state => {
  return {
    docs: state.docs,
    config: state.config
  };
})(Viewer);
