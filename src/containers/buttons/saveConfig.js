'use strict';

import React from 'react';
import { Config } from '../../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { SaveConfig } from '../../components/buttons';

class tpl extends React.Component {
  render() {
    return <SaveConfig {...this.props} />;
  }
}

const mapStateToProps = (state, props) => props;
const mapDispatchToProps = {
  save: () => Config.save()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    (state, actions) => actions.save,
    save => ({
      label: 'save',
      onTouchTap: save,
      primary: true
    })
  )
)(tpl);
