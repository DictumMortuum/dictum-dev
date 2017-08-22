'use strict';

import React from 'react';
import { Doc } from '../../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { NewDoc } from '../../components/buttons';

class NewDocContainer extends React.Component {
  render() {
    return <NewDoc {...this.props} />;
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
)(NewDocContainer);
