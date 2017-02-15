'use strict';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

let Editor = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    editor: React.PropTypes.object
  },

  render() {
    let { doc } = this.props.editor;
    console.log(doc);

    return (
      <div>
        <TextField hintText="Company" value={doc.company} />
        <TextField hintText="Product" value={doc.product} />
        <TextField hintText="Type" value={doc.type} />
        <TextField hintText="Languages" value={doc.lang} />
        <TextField hintText="JIRA ticket" value={doc.ticket} />
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
      </div>
    );
  }
});

export default connect(state => {
  return {
    config: state.config,
    editor: state.editor
  };
})(Editor);
