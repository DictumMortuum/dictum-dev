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
import { Text } from './text';
import Jira from './doc/jira';
import Filter from './doc/filter';
import PropTypes from 'prop-types';

const Input = (editor, properties) => (
  <div style={{flex: 2, padding: 16}}>
    <h2>Created on: {editor.date}</h2>
    {properties.filter(p => p.status === true).map(p => (
      <Text id={p.name} hint={p.hint} value={editor[p.name]} />
    ))}
  </div>
);

const propertyStatus = (props, name) => props.filter(p => p.name === name).map(p => p.status)[0];

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
    let { config, editor } = this.props;
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
            {propertyStatus(config.documentProperties, 'title') &&
            <ToolbarTitle text={title} style={{overflow: 'hidden', width: 400}}/>}
            {propertyStatus(config.documentProperties, 'lang') && renderFilters(editor)}
            {propertyStatus(config.documentProperties, 'ticket') &&
              editor.ticket && <ToolbarSeparator />}
            {propertyStatus(config.documentProperties, 'ticket') && renderTickets(editor)}
          </ToolbarGroup>
        </Toolbar>
        <Paper style={{overflowY: 'scroll', height: '90%', display: 'flex'}}>
          {config.properties && Input(editor, config.documentProperties)}
          <Writer />
        </Paper>
      </div>
    );
  }
}

tpl.propTypes = {
  editor: PropTypes.object,
  config: PropTypes.object
};

const mapStateToProps = state => ({
  config: state.config,
  editor: state.editor
});

const mergeProps = createSelector(
  state => state.editor,
  state => state.config,
  (editor, config) => ({
    config,
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
