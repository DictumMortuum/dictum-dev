'use strict';

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Filter } from '../../redux/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { font } from '../../styles';

const template = React.createClass({
  render() {
    return (<FlatButton style={font} {...this.props} />);
  }
});

export default connect(
  (state, props) => ({
    props,
    filter: state.filter
  }),
  { toggle: Filter.toggle },
  createSelector(
    state => state.props,
    state => state.filter,
    (state, actions) => actions.toggle,
    (props, filter, toggle) => ({
      label: props.lang,
      secondary: filter.indexOf(props.lang) === -1 ? false : true,
      onTouchTap: () => toggle(props.lang)
    })
  )
)(template);
