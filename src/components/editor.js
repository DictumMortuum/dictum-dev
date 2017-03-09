'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import store from '../redux/store';
import { newDoc, commitDoc } from '../redux/actions/docs';
import RaisedButton from 'material-ui/RaisedButton';
import { editorStyle, inputStyle } from '../styles/app';
import Text from './text';
import ArrayText from './arraytext';
import Writer from './writer';

let Editor = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    editor: React.PropTypes.object
  },

  handleNew() {
    store.dispatch(newDoc());
  },

  handleSave() {
    store.dispatch(commitDoc());
  },

  render() {
    let { editor, config } = this.props;

    return (
      <Paper style={editorStyle} zDepth={0}>
        <Paper style={inputStyle}>
          <Text key="company" id="company" hint="Company" value={editor.company} />
          <Text key="product" id="product" hint="Product" value={editor.product} />
          <Text key="type" id="type" hint="Type" value={editor.type} />
          <ArrayText key="lang" id="lang" hint="Langs" value={editor.lang} />
          <Text key="ticket" id="ticket" hint="JIRA" value={editor.ticket} />
          <Text key="date" id="date" hint="Date"
            value={editor.date.toLocaleDateString(config.locale)}
          />
        </Paper>
        <Writer id="desc" value={editor.desc} />
        <div style={{textAlign: 'center', padding: 10}}>
          <RaisedButton primary={true} label={'new'} onTouchTap={this.handleNew}
            style={{marginRight: 10}}
          />
          <RaisedButton secondary={true} label={'save'} onTouchTap={this.handleSave} />
        </div>
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
