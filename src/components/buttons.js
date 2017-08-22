'use strict';

import React from 'react';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSave from 'material-ui/svg-icons/content/save';
import Settings from 'material-ui/svg-icons/action/settings';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionCreate from 'material-ui/svg-icons/content/create';
import { font } from '../styles';

export class NewDoc extends React.Component {
  render() {
    return (
      <IconButton {...this.props}>
        <ActionCreate />
      </IconButton>
    );
  }
}

export class SaveConfig extends React.Component {
  render() {
    return <RaisedButton style={{marginTop: 10}} {...this.props} />;
  }
}

export class SaveDoc extends React.Component {
  render() {
    return (
      <IconButton {...this.props}>
        <ActionSave />
      </IconButton>
    );
  }
}

export class ToggleDocProperties extends React.Component {
  render() {
    return (
      <IconButton {...this.props}>
        <Settings />
      </IconButton>
    );
  }
}

export class ToggleEditor extends React.Component {
  render() {
    return (
      <IconButton {...this.props}>
        <ActionVisibility />
      </IconButton>
    );
  }
}

export class Jira extends React.Component {
  render() {
    return <RaisedButton style={font} {...this.props} />;
  }
}
