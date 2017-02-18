'use strict';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

let Editor = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    editor: React.PropTypes.object
  },

  render() {
    let { doc } = this.props.editor;

    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column'
    };

    // TODO: add ids to the textfields.
    return (
      <Paper style={{padding: 10}} zDepth={0}>
        <div style={style}>
          <TextField id='editorcompany' fullWidth={true}
            hintText="Company" value={doc.company} />
          <TextField id='editorproduct' fullWidth={true}
            hintText="Product" value={doc.product} />
          <TextField id='editortype' fullWidth={true}
            hintText="Type" value={doc.type} />
          <TextField id='editorlang' fullWidth={true}
            hintText="Languages" value={doc.lang} />
          <TextField id='editorticket' fullWidth={true}
            hintText="JIRA ticket" value={doc.ticket} />
        </div>
        <SimpleMDE
          value={doc.desc}
          options={{
            toolbar: ['bold', 'italic', 'heading', 'strikethrough', '|',
              'unordered-list', 'ordered-list', 'table', '|',
              'link', 'image', 'horizontal-rule', 'quote', '|',
              'preview'],
            tabsize: 2,
            status: false
          }}
        />
      </Paper>
    );
  }
});

export default connect(state => {
  return {
    config: state.config,
    editor: state.editor
  };
})(Editor);
