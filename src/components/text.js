'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { Doc, Editor } from '../redux/actions';
import { textStyle } from '../styles';
import { createSelector } from 'reselect';

let template = React.createClass({
  render() {
    return (<TextField {...this.props} />);
  }
});

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
      value: props.value.toString(),
      style: textStyle,
      onChange: (event, value) => change(props.id, value.split(','))
    })
  )
)(template);

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
)(template);

export const SearchText = connect(
  (state, props) => ({
    props,
    search: state.search
  }),
  { action: Doc.search },
  createSelector(
    state => state.props,
    state => state.search,
    (state, actions) => actions.action,
    (props, search, action) => ({
      id: props.id,
      key: props.id,
      hintText: props.hint,
      value: search.term,
      onChange: (event, value) => action(value)
    })
  )
)(template);
