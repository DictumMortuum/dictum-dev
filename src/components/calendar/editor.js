'use strict';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { editorChange } from '../../redux/actions/editor';
import { insertDoc } from '../../redux/actions/docs';
import RaisedButton from 'material-ui/RaisedButton';

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
        style={{fontFamily: 'monospace', fontSize: 14}}
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
        style={{fontFamily: 'monospace', fontSize: 14}}
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
      <Paper>
        <SimpleMDE
          value={this.props.editor.doc.desc}
          options={{
            toolbar: ['bold', 'italic', 'heading', '|',
              'unordered-list', 'ordered-list', '|',
              'link', 'image', 'horizontal-rule', 'quote', '|',
              'preview'],
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

let Editor = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    editor: React.PropTypes.object
  },

  handleNew() {
    let doc = { _id: new Date() };
    console.log('new doc!', doc);
    store.dispatch(insertDoc(doc));
    // store.dispatch(toEditor(doc, 0));
  },

  handleSave() {
    console.log('save doc!');
  },

  render() {
    let { editor } = this.props;

    const style = {
      padding: '0 10px 2px 10px',
      marginBottom: 10
    };

    const paperStyle = {
      padding: 10,
      position: 'fixed',
      top: '0%',
      left: '50%',
      width: '50%',
      transform: 'translateY(+10%)'
    };

    return (
      <Paper style={paperStyle} zDepth={0}>
        <Paper style={style}>
          <Text id="company" hint="Company" editor={editor} />
          <Text id="product" hint="Product" editor={editor} />
          <Text id="type" hint="Type" editor={editor} />
          <ArrayText id="lang" hint="Languages" editor={editor} />
          <Text id="ticket" hint="JIRA ticket" editor={editor} />
        </Paper>
        <Writer id="desc" editor={editor} />
        <div style={{textAlign: 'center', padding: 10}}>
          <RaisedButton
            style={{marginRight: 10}}
            primary={true}
            label={'new'}
            onTouchTap={this.handleNew}
          />
          <RaisedButton
            secondary={true}
            label={'save'}
            onTouchTap={this.handleSave}
          />
        </div>
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
