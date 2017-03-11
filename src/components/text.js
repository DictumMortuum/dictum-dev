'use strict';

import React from 'react';
import TextField from 'material-ui/TextField';
import store from '../redux/store';
import { editorChange } from '../redux/actions';
import { textStyle } from '../styles/app';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    hint: React.PropTypes.string,
    value: React.PropTypes.string
  },

  handleChange(event, value) {
    store.dispatch(editorChange(this.props.id, value));
  },

  render() {
    return (
      <TextField
        id={this.props.hint}
        hintText={this.props.hint}
        value={this.props.value}
        onChange={this.handleChange}
        style={textStyle}
      />
    );
  }
});
