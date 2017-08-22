'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Filter } from '../../redux/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { font } from '../../styles';

class tpl extends React.Component {
  render() {
    return (<RaisedButton style={font} {...this.props} />);
  }
}

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
)(tpl);
