'use strict';

import React from 'react';
import { Doc } from '../../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import ActionSave from 'material-ui/svg-icons/content/save';

let template = React.createClass({
  render() {
    return (
      <IconButton {...this.props}>
        <ActionSave />
      </IconButton>
    );
  }
});

const mapStateToProps = (state, props) => props;
const mapDispatchToProps = {
  save: () => Doc.commit()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    (state, actions) => actions.save,
    save => ({
      onTouchTap: save
    })
  )
)(template);
