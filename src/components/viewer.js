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
import PropTypes from 'prop-types';
import { propertyStatus } from './common';

const style = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  flex: 4,
  margin: 3,
  height: '100%'
};

class tpl extends React.Component {
  render() {
    let { docs, term, type, onScroll } = this.props;

    return (
      <div style={style}>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <NewDoc />
          </ToolbarGroup>
          <ToolbarGroup>
            <SearchText hint='Search...' value={term} />
            {type && <Type />}
          </ToolbarGroup>
        </Toolbar>
        <Paper onScroll={onScroll} style={{overflowY: 'scroll', height: '90%'}}>
          {docs.map(d => (<Doc key={d._id} doc={d} />))}
        </Paper>
      </div>
    );
  }
}

tpl.propTypes = {
  docs: PropTypes.array,
  term: PropTypes.string,
  type: PropTypes.bool,
  onScroll: PropTypes.func
};

const mapStateToProps = state => ({
  docs: state.docs,
  length: state.length,
  filter: state.filter,
  search: state.search,
  type: state.type,
  config: state.config
});

const mapDispatchToProps = {
  scroll: Actions.scroll
};

const mergeProps = createSelector(
  state => state.docs,
  state => state.length,
  state => state.filter,
  state => state.search,
  state => state.type,
  state => state.config,
  (state, actions) => actions.scroll,
  (docs, length, filters, search, type, config, scroll) => {
    let res = search.docs.length === 0 ? docs : search.docs;
    return {
      type: propertyStatus(config.documentProperties, 'type'),
      term: search.term,
      onScroll: (event) => {
        if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
          scroll();
        }
      },
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
          let temp;

          if (typeof d.type === 'string') {
            temp = [d.type];
          } else {
            // array
            temp = d.type;
          }

          return temp.some(t => type.selected.includes(t));
        }
      })
      .slice(0, length)
    };
  }
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(tpl);
