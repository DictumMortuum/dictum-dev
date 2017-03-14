'use strict';

import React from 'react';
import Doc from './doc';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

let Viewer = React.createClass({
  propTypes: {
    docs: React.PropTypes.array,
    config: React.PropTypes.object
  },

  render() {
    let { docs, config } = this.props;

    return (
      <Paper zDepth={0} style={{padding: 10, marginTop: 64}} >
        {docs.map((d, index) => {
          return (<Doc key={d._id} doc={d} config={config} index={index} />);
        })}
      </Paper>
    );
  }
});

const mapStateToProps = state => ({
  docs: state.docs,
  config: state.config,
  length: state.length
});

const mergeProps = createSelector(
  state => state.docs,
  state => state.config,
  state => state.length,
  (docs, config, length) => ({
    config,
    docs: docs.slice(0, length)
  })
);

export default connect(mapStateToProps, {}, mergeProps)(Viewer);
