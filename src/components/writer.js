'use strict';

import React from 'react';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import ReactMarkdown from 'react-markdown';

let template = React.createClass({
  propTypes: {
    writer: React.PropTypes.object,
    editor: React.PropTypes.bool
  },

  render() {
    return (
      <Card>
        <CardText>
          {this.props.editor
            && <TextField {...this.props.writer} underlineStyle={{display: 'none'}} />
            || <ReactMarkdown source={this.props.writer.value} />
          }
        </CardText>
      </Card>
    );
  }
});

const mapStateToProps = state => ({
  editor: state.editor,
  config: state.config
});

const mapDispatchToProps = {
  change: Editor.change
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    state => state.editor,
    state => state.config,
    (state, actions) => actions.change,
    (editor, config, change) => ({
      editor: config.editor,
      writer: {
        id: 'desc',
        key: 'desc',
        value: editor.desc || '',
        multiLine: true,
        fullWidth: true,
        rowsMax: 22,
        rows: 22,
        onChange: (event, value) => change('desc', value)
      }
    })
  )
)(template);
