'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { editorStyle, inputStyle } from '../styles';
import { Text, ArrayText } from './text';
import Writer from './writer';
import { createSelector } from 'reselect';

const Input = editor => (
  <Paper style={inputStyle}>
    <Text id="company" hint="Company" value={editor.company} />
    <Text id="product" hint="Product" value={editor.product} />
    <Text id="type" hint="Type" value={editor.type} />
    <ArrayText id="lang" hint="Langs" value={editor.lang} />
    <Text id="ticket" hint="JIRA" value={editor.ticket} />
    <Text id="date" hint="Created on" value={editor.date} />
  </Paper>
);

let Editor = React.createClass({
  propTypes: {
    editor: React.PropTypes.object
  },

  render() {
    let { editor } = this.props;

    return (
      <Paper style={editorStyle} zDepth={0}>
        {Input(editor)}
        <Writer id="desc" value={editor.desc} />
      </Paper>
    );
  }
});

const mapStateToProps = state => ({
  config: state.config,
  editor: state.editor
});

const mergeProps = createSelector(
  state => state.editor,
  state => state.config,
  (editor, config) => ({
    editor: {
      company: editor.company || '',
      product: editor.product || '',
      type: editor.type || '',
      lang: editor.lang || [],
      ticket: editor.ticket || '',
      desc: editor.desc || '',
      date: new Date(editor._id || (new Date()).toISOString()).toLocaleDateString(config.locale, {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })
    }
  })
);

export default connect(mapStateToProps, {}, mergeProps)(Editor);
