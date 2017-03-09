'use strict';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import Paper from 'material-ui/Paper';
import store from '../redux/store';
import { editorChange } from '../redux/actions/editor';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    value: React.PropTypes.string
  },

  handleChange(value) {
    store.dispatch(editorChange(this.props.id, value));
  },

  render() {
    return (
      <Paper>
        <SimpleMDE
          value={this.props.value}
          options={{
            toolbar: ['bold', 'italic', 'heading', 'unordered-list', 'ordered-list',
              'link', 'image', 'horizontal-rule', 'quote', 'preview'],
            tabsize: 2,
            status: false,
            spellChecker: false
          }}
          onChange={this.handleChange}
        />
      </Paper>
    );
  }
});
