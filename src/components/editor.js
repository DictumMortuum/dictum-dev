'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { palette } from '../styles';
import Writer from './writer';
import { createSelector } from 'reselect';

// EDITOR
const style = {
  backgroundColor: palette.accent2Color,
  flex: 2
};

let Editor = React.createClass({
  propTypes: {
    editor: React.PropTypes.object
  },

  render() {
    let { editor } = this.props;

    return (
      <Paper style={style} zDepth={0}>
        <Writer id="desc" value={editor.desc} />
      </Paper>
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
