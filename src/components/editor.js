'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Writer from './writer';
import { createSelector } from 'reselect';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import SaveDoc from './buttons/saveDoc';
import ToggleEditor from './buttons/toggleEditor';
import ToggleProperties from './buttons/toggleDocProperties';
import Paper from 'material-ui/Paper';
import { Text, ArrayText } from './text';
import Jira from './doc/jira';
import Filter from './doc/filter';
import PropTypes from 'prop-types';

const Input = editor => (
  <div style={{flex: 2, padding: 16}}>
    <ArrayText id="title" hint="Title" value={editor.title} />
    <ArrayText id="company" hint="Company" value={editor.company} />
    <ArrayText id="product" hint="Product" value={editor.product} />
    <ArrayText id="type" hint="Type" value={editor.type} />
    <ArrayText id="lang" hint="Langs" value={editor.lang} />
    <ArrayText id="ticket" hint="JIRA" value={editor.ticket} />
    <Text id="date" hint="Created on" value={editor.date} />
  </div>
);

const renderFilters = editor => {
  let lang = [];

  if (typeof editor.lang === 'string') {
    if (editor.lang !== '') {
      lang = [editor.lang];
    }
  } else if (editor.lang !== undefined) {
    lang = editor.lang;
  }

  return lang.map(l => (<Filter lang={l} key={l} />));
};

const renderTickets = editor => {
  let ticket = [];

  if (typeof editor.ticket === 'string') {
    if (editor.ticket !== '') {
      ticket = [editor.ticket];
    }
  } else if (editor.ticket !== undefined) {
    ticket = editor.ticket;
  }

  return ticket.map(t => (<Jira ticket={t} key={t} />));
};

const style = {
  flex: 8,
  margin: 3,
  height: '100%'
};

class tpl extends React.Component {
  render() {
    let { properties, editor } = this.props;
    let title = editor.title || editor.desc || '';

    return (
      <div style={style}>
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <SaveDoc />
            <ToggleEditor />
            <ToggleProperties />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text={title} style={{overflow: 'hidden', width: 400}}/>
            {renderFilters(editor)}
            {editor.ticket && <ToolbarSeparator />}
            {renderTickets(editor)}
          </ToolbarGroup>
        </Toolbar>
        <Paper style={{overflowY: 'scroll', height: '90%', display: 'flex'}}>
          {properties && Input(editor)}
          <Writer />
        </Paper>
      </div>
    );
  }
}

tpl.propTypes = {
  editor: PropTypes.object,
  properties: PropTypes.bool
};

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
      ...editor,
      desc: editor.desc || '',
      date: new Date(editor._id || (new Date()).toISOString()).toLocaleDateString(config.locale, {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })
    }
  })
);

export default connect(mapStateToProps, {}, mergeProps)(tpl);
