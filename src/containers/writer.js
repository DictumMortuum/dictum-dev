'use strict';

import React from 'react';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import TextArea from 'react-textarea-autosize';
import PropTypes from 'prop-types';

const style = {
  padding: 16,
  border: 0,
  flex: 10
};

class Writer extends React.Component {
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
}

Writer.propTypes = {
  writer: PropTypes.object,
  editor: PropTypes.bool
};

const mapStateToProps = state => ({
  editor: state.editor,
  toggle: state.toggle
});

const mapDispatchToProps = {
  change: Editor.change
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    state => state.editor,
    state => state.toggle,
    (state, actions) => actions.change,
    (editor, toggle, change) => ({
      editor: toggle.editor,
      writer: {
        value: editor.desc || '',
        onChange: event => change('desc', event.target.value)
      }
    })
  )
)(Writer);
