'use strict';

import React from 'react';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Writer } from '../components/writer';

class WriterContainer extends React.Component {
  render() {
    return <Writer {...this.props} />;
  }
}

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
)(WriterContainer);
