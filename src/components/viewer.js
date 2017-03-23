'use strict';

import React from 'react';
import Doc from './doc';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { viewerStyle } from '../styles';

let Viewer = React.createClass({
  propTypes: {
    docs: React.PropTypes.array,
    config: React.PropTypes.object
  },

  render() {
    let { docs, config } = this.props;

    return (
      <Paper zDepth={0} style={viewerStyle} >
        {docs.map(d => (<Doc key={d._id} doc={d} config={config} />))}
      </Paper>
    );
  }
});

const mapStateToProps = state => ({
  docs: state.docs,
  config: state.config,
  length: state.length,
  filter: state.filter
});

const mergeProps = createSelector(
  state => state.docs,
  state => state.config,
  state => state.length,
  state => state.filter,
  (docs, config, length, filters) => ({
    config,
    docs: docs.filter(d => {
      // lang may be undefined in some documents
      let langs = d.lang || [];

      // If there are no filters, there's nothing to filter.
      if (filters.length === 0) {
        return true;
      } else {
        // Test every filter against the langs of the doc
        return filters.every(f => langs.indexOf(f) >= 0);
      }
    }).slice(0, length)
  })
);

export default connect(mapStateToProps, {}, mergeProps)(Viewer);
