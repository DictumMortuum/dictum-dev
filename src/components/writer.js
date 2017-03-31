'use strict';

import React from 'react';
import { Doc, Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardText } from 'material-ui/Card';
import ReactMarkdown from 'react-markdown';
import IconButton from 'material-ui/IconButton';
import ActionCreate from 'material-ui/svg-icons/content/create';
import ActionSave from 'material-ui/svg-icons/content/save';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';

let template = React.createClass({
  propTypes: {
    writer: React.PropTypes.object,
    create: React.PropTypes.func,
    save: React.PropTypes.func
  },

  getInitialState() {
    return {
      editor: false
    };
  },

  render() {
    return (
      <Card>
        <CardActions actAsExpander={true} showExpandableButton={true}>
          <IconButton onTouchTap={this.props.create}>
            <ActionCreate />
          </IconButton>
          <IconButton onTouchTap={this.props.save}>
            <ActionSave />
          </IconButton>
          <IconButton onTouchTap={() => this.setState({editor: !this.state.editor})}>
            <ActionVisibility />
          </IconButton>
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

const mapStateToProps = (state, props) => props;
const mapDispatchToProps = {
  change: Editor.change,
  new: () => Doc.new(),
  save: () => Doc.commit()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    props => props,
    (state, actions) => actions.change,
    (state, actions) => actions.new,
    (state, actions) => actions.save,
    (props, change, create, save) => ({
      writer: {
        id: props.id,
        key: props.id,
        hintText: props.hint,
        value: props.value,
        multiLine: true,
        fullWidth: true,
        rowsMax: 22,
        rows: 22,
        onChange: (event, value) => change(props.id, value)
      },
      create,
      save
    })
  )
)(template);
