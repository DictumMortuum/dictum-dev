'use strict';

import React from 'react';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import TextArea from 'react-textarea-autosize';

let template = React.createClass({
  propTypes: {
    writer: React.PropTypes.object,
    editor: React.PropTypes.bool
  },

  render() {
    let { editor } = this.props;

    if (editor) {
      return (<TextArea {...this.props.writer} />);
    } else {
      return (<ReactMarkdown source={this.props.writer.value} />);
    }
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
        value: editor.desc || '',
        style: {
          width: '100%',
          padding: 16,
          border: 0,
          boxSizing: 'border-box',
          overflow: 'hidden'
        },
        onChange: event => change('desc', event.target.value)
      }
    })
  )
)(template);
