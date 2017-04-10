'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Writer from './writer';
import { createSelector } from 'reselect';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import SaveDoc from './buttons/saveDoc';
import ToggleEditor from './buttons/toggleEditor';
import ToggleProperties from './buttons/toggleDocProperties';
import Paper from 'material-ui/Paper';
import { Text, ArrayText } from './text';

const Input = editor => (
  <div style={{flex: 1, padding: 16}}>
    <Text id="company" hint="Company" value={editor.company} />
    <Text id="product" hint="Product" value={editor.product} />
    <Text id="type" hint="Type" value={editor.type} />
    <ArrayText id="lang" hint="Langs" value={editor.lang} />
    <Text id="ticket" hint="JIRA" value={editor.ticket} />
    <Text id="date" hint="Created on" value={editor.date} />
  </div>
);

const style = {
  flex: 2,
  margin: 3,
  height: '100%'
};

let Editor = React.createClass({
  propTypes: {
    editor: React.PropTypes.object,
    properties: React.PropTypes.bool
  },

  render() {
    let { properties, editor } = this.props;

    return (
      <div style={style}>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <SaveDoc />
            <ToggleEditor />
            <ToggleProperties />
          </ToolbarGroup>
        </Toolbar>
        <Paper style={{overflowY: 'scroll', height: '90%', display: 'flex'}}>
          {properties && Input(editor)}
          <Writer />
        </Paper>
      </div>
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
    properties: config.properties,
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
