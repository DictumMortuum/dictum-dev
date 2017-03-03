'use strict';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { editorChange } from '../../redux/actions/editor';

/*
import Promise from 'bluebird';
let p = Promise.delay(1000);
let document = null;
*/

let Text = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    hint: React.PropTypes.string,
    editor: React.PropTypes.object
  },

  handleChange(event, value) {
    let { editor, id } = this.props;
    editor.doc[id] = value;
    store.dispatch(editorChange(editor.id, editor.doc));
  },

  render() {
    let { editor, id } = this.props;
    let value = editor.doc[id];

    return (
      <TextField
        id={this.props.hint}
        fullWidth={true}
        hintText={this.props.hint}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
});

let ArrayText = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    hint: React.PropTypes.string,
    editor: React.PropTypes.object
  },

  handleChange(event, value) {
    let { editor, id } = this.props;
    editor.doc[id] = value.split(',');
    store.dispatch(editorChange(editor.id, editor.doc));
  },

  render() {
    let { editor, id } = this.props;
    let value = editor.doc[id].toString();

    return (
      <TextField
        id={this.props.hint}
        fullWidth={true}
        hintText={this.props.hint}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
});

let Writer = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    editor: React.PropTypes.object
  },

  handleChange(value) {
    let { editor, id } = this.props;
    editor.doc[id] = value;
    store.dispatch(editorChange(editor.id, editor.doc));
  },

  render() {
    return (
      <SimpleMDE
        value={this.props.editor.doc.desc}
        options={{
          toolbar: ['bold', 'italic', 'heading', 'strikethrough', '|',
            'unordered-list', 'ordered-list', 'table', '|',
            'link', 'image', 'horizontal-rule', 'quote', '|',
            'preview'],
          tabsize: 2,
          status: false
        }}
        onChange={this.handleChange}
      />
    );
  }
});

let Editor = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    editor: React.PropTypes.object
  },

  render() {
    let { editor } = this.props;

    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    };

    const paperStyle = {
      padding: 10,
      position: 'fixed',
      top: '10%',
      left: '50%',
      width: '50%'
    };

    return (
      <Paper style={paperStyle} zDepth={0}>
        <div style={style}>
          <Text id="company" hint="Company" editor={editor} />
          <Text id="product" hint="Product" editor={editor} />
          <Text id="type" hint="Type" editor={editor} />
          <ArrayText id="lang" hint="Languages" editor={editor} />
          <Text id="ticket" hint="JIRA ticket" editor={editor} />
        </div>
        <Writer id="desc" editor={editor} />
      </Paper>
    );
  }
});

export default connect(state => {
  return {
    config: state.config,
    editor: state.editor
  };
})(Editor);
