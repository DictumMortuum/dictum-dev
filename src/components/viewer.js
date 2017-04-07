'use strict';

import React from 'react';
import Doc from './doc';
import Paper from 'material-ui/Paper';
import Type from './type';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { SearchText } from './text';
import NewDoc from './buttons/newDoc';
import { Doc as Actions } from '../redux/actions';
import store from '../redux/store';

const style = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  flex: 1,
  margin: 5,
  height: '100%'
};

let Viewer = React.createClass({
  propTypes: {
    docs: React.PropTypes.array,
    term: React.PropTypes.string
  },

  handleScroll(event) {
    if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
      store.dispatch(Actions.scroll());
    }
  },

  render() {
    let { docs, term } = this.props;

    return (
      <div style={style}>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <NewDoc />
            <Type />
            <SearchText hint='Search...' value={term} />
          </ToolbarGroup>
        </Toolbar>
        <Paper onScroll={this.handleScroll} style={{overflowY: 'scroll', height: '90%'}}>
          {docs.map(d => (<Doc key={d._id} doc={d} />))}
        </Paper>
      </div>
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
      term: search.term,
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
