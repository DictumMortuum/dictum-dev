'use strict';

import React from 'react';
import { Doc } from '../../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionCreate from 'material-ui/svg-icons/content/create';

class tpl extends React.Component {
  render() {
    return (
      <IconButton {...this.props}>
        <ActionCreate />
      </IconButton>
    );
  }
}

const mapStateToProps = (state, props) => props;
const mapDispatchToProps = {
  new: () => Doc.new()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    (state, actions) => actions.new,
    create => ({
      onTouchTap: create
    })
  )
)(tpl);
