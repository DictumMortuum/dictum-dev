'use strict';

import React from 'react';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import TextArea from 'react-textarea-autosize';

const style = {
  padding: 16,
  border: 0,
  flex: 4
};

let template = React.createClass({
  propTypes: {
    writer: React.PropTypes.object,
    editor: React.PropTypes.bool
  },

  render() {
    let { editor } = this.props;

    if (editor) {
      return (<TextArea {...this.props.writer} style={{overflow: 'hidden', ...style}} />);
    } else {
      return (
        <div style={style}>
          <ReactMarkdown source={this.props.writer.value} />
        </div>
      );
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
        onChange: event => change('desc', event.target.value)
      }
    })
  )
)(template);
