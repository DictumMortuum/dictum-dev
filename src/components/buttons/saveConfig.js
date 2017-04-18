'use strict';

import React from 'react';
import { Config } from '../../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  marginTop: 10
};

class tpl extends React.Component {
  render() {
    return (
      <RaisedButton style={style} {...this.props} />
    );
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
