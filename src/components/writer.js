'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

const style = {
  paddingLeft: 10,
  paddingRight: 10
};

let template = React.createClass({
  render() {
    return (
      <Paper style={style}>
        <TextField {...this.props} underlineStyle={{display: 'none'}} />
      </Paper>
    );
  }
});

const mapStateToProps = (state, props) => props;
const mapDispatchToProps = { change: Editor.change };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    props => props,
    (state, actions) => actions.change,
    (props, change) => ({
      id: props.id,
      key: props.id,
      hintText: props.hint,
      value: props.value,
      multiLine: true,
      fullWidth: true,
      rowsMax: 24,
      rows: 24,
      onChange: (event, value) => change(props.id, value)
    })
  )
)(template);
