'use strict';

import React from 'react';
import Doc from './doc';
import Paper from 'material-ui/Paper';
import Type from './type';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { viewerStyle } from '../styles';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

let Viewer = React.createClass({
  propTypes: {
    docs: React.PropTypes.array
  },

  render() {
    let { docs } = this.props;

    return (
      <Paper zDepth={0} style={{...viewerStyle, flex: 1}}>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Type />
          </ToolbarGroup>
        </Toolbar>
        {docs.map(d => (<Doc key={d._id} doc={d} />))}
      </Paper>
    );
  }
});

const mapStateToProps = state => ({
  docs: state.docs,
  length: state.length,
  filter: state.filter,
  search: state.search,
  type: state.type
});

const mergeProps = createSelector(
  state => state.docs,
  state => state.length,
  state => state.filter,
  state => state.search,
  state => state.type,
  (docs, length, filters, search, type) => {
    let res = search.docs.length === 0 ? docs : search.docs;
    return {
      docs: res.filter(d => {
        // lang may be undefined in some documents
        let langs = d.lang || [];

        // If there are no filters, there's nothing to filter.
        if (filters.length === 0) {
          return true;
        } else {
          // Test every filter against the langs of the doc
          return filters.every(f => langs.indexOf(f) >= 0);
        }
      })
      .filter(d => {
        if (type.selected.length === 0) {
          // If there are no types, there's nothing to filter.
          return true;
        } else {
          // Check that the current doc's type is in the selected ones.
          return type.selected.includes(d.type);
        }
      })
      .slice(0, length)
    };
  }
);

export default connect(mapStateToProps, {}, mergeProps)(Viewer);
