'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Editor } from '../redux/actions';
import { textStyle } from '../styles';
import { createSelector } from 'reselect';

let template = React.createClass({
  render() {
    return (<TextField {...this.props} style={textStyle} />);
  }
});

const arrayText = (props, change) => ({
  id: props.id,
  key: props.id,
  hintText: props.hint,
  value: props.value.toString(),
  onChange: (event, value) => change(props.id, value.split(','))
});

const text = (props, change) => ({
  id: props.id,
  key: props.id,
  hintText: props.hint,
  value: props.value,
  onChange: (event, value) => change(props.id, value)
});

export const ArrayText = connect(
  (state, props) => props,
  { change: Editor.change },
  createSelector(
    props => props,
    (state, actions) => actions.change,
    arrayText
  )
)(template);

export const Text = connect(
  (state, props) => props,
  { change: Editor.change },
  createSelector(
    props => props,
    (state, actions) => actions.change,
    text
  )
)(template);
