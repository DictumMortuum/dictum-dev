'use strict';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { editorChange } from '../../redux/actions/editor';

let Text = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    hint: React.PropTypes.string,
    value: React.PropTypes.string
  },

  handleChange(event, newValue) {
    store.dispatch(editorChange(this.props.id, newValue));
  },

  render() {
    return (
      <TextField
        id={this.props.hint}
        fullWidth={true}
        hintText={this.props.hint}
        value={this.props.value}
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
    let { doc } = this.props.editor;

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
          <Text id="company" hint="Company" value={doc.company} />
          <Text id="product" hint="Product" value={doc.product} />
          <Text id="type" hint="Type" value={doc.type} />
          <Text id="lang" hint="Languages" value={doc.lang.toString()} />
          <Text id="ticket" hint="JIRA ticket" value={doc.ticket} />
        </div>
        <SimpleMDE
          value={doc.desc}
          options={{
            toolbar: ['bold', 'italic', 'heading', 'strikethrough', '|',
              'unordered-list', 'ordered-list', 'table', '|',
              'link', 'image', 'horizontal-rule', 'quote', '|',
              'preview'],
            tabsize: 2,
            status: false
          }}
        />
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
