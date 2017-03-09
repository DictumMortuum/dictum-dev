'use strict';

import React from 'react';
import Doc from './doc';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

let Viewer = React.createClass({
  propTypes: {
    docs: React.PropTypes.array,
    config: React.PropTypes.object,
    length: React.PropTypes.number
  },

  render() {
    let { docs, config, length } = this.props;

    return (
      <Paper zDepth={0} style={{padding: 10}} >
        {docs.slice(0, length).map((d, index) => {
          return (<Doc key={d._id} doc={d} config={config} index={index} />);
        })}
      </Paper>
    );
  }
});

export default connect(state => {
  return {
    docs: state.docs,
    config: state.config,
    length: state.length
  };
})(Viewer);
