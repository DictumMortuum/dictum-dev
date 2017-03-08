'use strict';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import store from '../redux/store';
import { editorChange } from '../redux/actions/editor';
import { insertDoc } from '../redux/actions/docs';
import RaisedButton from 'material-ui/RaisedButton';

const textStyle= {fontFamily: 'monospace', fontSize: 14, flex: '1 0 50%'};

let Text = React.createClass({
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

let ArrayText = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    hint: React.PropTypes.string,
    value: React.PropTypes.array
  },

  handleChange(event, value) {
    store.dispatch(editorChange(this.props.id, value.split(',')));
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

let Writer = React.createClass({
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

let Editor = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    editor: React.PropTypes.object
  },

  handleNew() {
    let doc = { _id: new Date().toISOString() };
    store.dispatch(insertDoc(doc));
  },

  handleSave() {
    console.log('save doc!');
  },

  render() {
    let { editor, config } = this.props;

    const style = {
      display: 'flex',
      padding: '0 10px 0 10px',
      marginBottom: 10,
      flexWrap: 'wrap',
      flexDirection: 'row'
    };

    const paperStyle = {
      position: 'fixed',
      paddingRight: 10,
      top: 74,
      left: '50%',
      width: '50%'
    };

    return (
      <Paper style={paperStyle} zDepth={0}>
        <Paper style={style}>
          <Text key="company" id="company" hint="Company" value={editor.company} />
          <Text key="product" id="product" hint="Product" value={editor.product} />
          <Text key="type" id="type" hint="Type" value={editor.type} />
          <ArrayText key="lang" id="lang" hint="Langs" value={editor.lang} />
          <Text key="ticket" id="ticket" hint="JIRA" value={editor.ticket} />
          <Text key="date" id="date" hint="Date"
            value={editor.date.toLocaleDateString(config.locale)}
          />
        </Paper>
        <Writer id="desc" value={editor.desc} />
        <div style={{textAlign: 'center', padding: 10}}>
          <RaisedButton primary={true} label={'new'} onTouchTap={this.handleNew}
            style={{marginRight: 10}}
          />
          <RaisedButton secondary={true} label={'save'} onTouchTap={this.handleSave} />
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
