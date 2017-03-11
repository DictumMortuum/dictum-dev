'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import store from '../redux/store';
import { Editor } from '../redux/actions';
import { textStyle } from '../styles/app';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    hint: React.PropTypes.string,
    value: React.PropTypes.array
  },

  handleChange(event, value) {
    store.dispatch(Editor.change(this.props.id, value.split(',')));
  },

  render() {
    let { value } = this.props;

    return (
      <TextField
        id={this.props.hint}
        hintText={this.props.hint}
        value={value.toString()}
        onChange={this.handleChange}
        style={textStyle}
      />
    );
  }
});
