'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { SearchText } from '../containers/text';
import NewDoc from '../containers/buttons/newDoc';
import Doc from '../containers/doc';
import Type from '../containers/type';
import PropTypes from 'prop-types';

const style = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  flex: 4,
  margin: 3,
  height: '100%'
};

export class Viewer extends React.Component {
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

Viewer.propTypes = {
  docs: PropTypes.array,
  term: PropTypes.string,
  type: PropTypes.bool,
  onScroll: PropTypes.func
};
