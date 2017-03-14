'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Editor } from '../redux/actions';
import { textStyle } from '../styles';
import { createSelector } from 'reselect';

let ArrayText = React.createClass({
  render() {
    console.log(this.props);
    return (<TextField {...this.props} style={textStyle} />);
  }
});

const mapStateToProps = (state, props) => props;

const mapDispatchToProps = {
  change: Editor.change
};

const mergeProps = createSelector(
  props => props,
  (state, actions) => actions.change,
  (props, change) => ({
    id: props.id,
    key: props.id,
    hintText: props.hint,
    value: props.value.toString(),
    onChange: (event, value) => change(props.id, value.split(','))
  })
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ArrayText);
