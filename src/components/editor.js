'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { Doc } from '../redux/actions';
import RaisedButton from 'material-ui/RaisedButton';
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

const Buttons = (handleNew, handleSave) => (
  <div style={{textAlign: 'center', padding: 10}}>
    <RaisedButton primary={true} label={'new'} onTouchTap={handleNew} style={{marginRight: 10}} />
    <RaisedButton secondary={true} label={'save'} onTouchTap={handleSave} />
  </div>
);

let Editor = React.createClass({
  propTypes: {
    editor: React.PropTypes.object,
    handleNew: React.PropTypes.func,
    handleSave: React.PropTypes.func
  },

  render() {
    let { editor, handleNew, handleSave } = this.props;

    return (
      <Paper style={editorStyle} zDepth={0}>
        {Input(editor)}
        <Writer id="desc" value={editor.desc} />
        {Buttons(handleNew, handleSave)}
      </Paper>
    );
  }
});

const mapStateToProps = state => ({
  config: state.config,
  editor: state.editor
});

const mapDispatchToProps = {
  handleNew: () => Doc.new(),
  handleSave: () => Doc.commit()
};

const mergeProps = createSelector(
  state => state.editor,
  state => state.config,
  (state, actions) => actions.handleNew,
  (state, actions) => actions.handleSave,
  (editor, config, handleNew, handleSave) => ({
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
    },
    handleNew,
    handleSave
  })
);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor);
