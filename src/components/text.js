'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Doc, Editor } from '../redux/actions';
import { textStyle } from '../styles';
import { createSelector } from 'reselect';
import { toArray } from './common';

class tpl extends React.Component {
  render() {
    return (<TextField {...this.props} />);
  }
}

const mapStateToProps = (state, props) => props;

export const ArrayText = connect(
  mapStateToProps,
  { change: Editor.change },
  createSelector(
    props => props,
    (state, actions) => actions.change,
    (props, change) => ({
      id: props.id,
      key: props.id,
      hintText: props.hint,
      value: toArray(props.value),
      style: textStyle,
      onChange: (event, value) => {
        let temp = value.split(',');
        if (temp.length === 1) {
          change(props.id, value);
        } else {
          change(props.id, value.split(','));
        }
      }
    })
  )
)(tpl);

export const Text = connect(
  mapStateToProps,
  { change: Editor.change },
  createSelector(
    props => props,
    (state, actions) => actions.change,
    (props, change) => ({
      id: props.id,
      key: props.id,
      hintText: props.hint,
      value: props.value,
      style: textStyle,
      onChange: (event, value) => change(props.id, value)
    })
  )
)(tpl);

export const SearchText = connect(
  (state, props) => ({
    props
  }),
  { action: Doc.search },
  createSelector(
    state => state.props,
    (state, actions) => actions.action,
    (props, action) => ({
      id: props.id,
      key: props.id,
      hintText: props.hint,
      value: props.value,
      style: {
        width: '50%'
      },
      hintStyle: {
        color: 'black'
      },
      onChange: (event, value) => action(value)
    })
  )
)(tpl);
