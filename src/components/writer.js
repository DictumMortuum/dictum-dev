'use strict';

import React from 'react';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardText } from 'material-ui/Card';
import ReactMarkdown from 'react-markdown';
import SaveDoc from './buttons/saveDoc';
import Toggle from './buttons/toggle';

let template = React.createClass({
  propTypes: {
    writer: React.PropTypes.object
  },

  getInitialState() {
    return {
      editor: false
    };
  },

  render() {
    return (
      <Card>
        <CardActions>
          <SaveDoc />
          <Toggle onTouchTap={() => this.setState({editor: !this.state.editor})} />
        </CardActions>
        <CardText>
          {this.state.editor
            && <TextField {...this.props.writer} underlineStyle={{display: 'none'}} />
            || <ReactMarkdown source={this.props.writer.value} />
          }
        </CardText>
      </Card>
    );
  }
});

const mapStateToProps = state => ({
  editor: state.editor
});

const mapDispatchToProps = {
  change: Editor.change
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    state => state.editor,
    (state, actions) => actions.change,
    (editor, change) => ({
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
