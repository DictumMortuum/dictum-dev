'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import { Editor } from '../redux/actions';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardText } from 'material-ui/Card';
// import ReactMarkdown from 'react-markdown';
import IconButton from 'material-ui/IconButton';
import ActionCreate from 'material-ui/svg-icons/content/create';
import ActionSave from 'material-ui/svg-icons/content/save';

const style = {};

let template = React.createClass({
  render() {
    return (
      <Paper style={style}>
        <Card zDepth={0}>
          <CardActions actAsExpander={true} showExpandableButton={true}>
            <IconButton>
              <ActionCreate />
            </IconButton>
            <IconButton>
              <ActionSave />
            </IconButton>
          </CardActions>
          <CardText>
            <TextField {...this.props} underlineStyle={{display: 'none'}} />
          </CardText>
        </Card>
      </Paper>
    );
  }
});

const mapStateToProps = (state, props) => props;
const mapDispatchToProps = { change: Editor.change };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  createSelector(
    props => props,
    (state, actions) => actions.change,
    (props, change) => ({
      id: props.id,
      key: props.id,
      hintText: props.hint,
      value: props.value,
      multiLine: true,
      fullWidth: true,
      rowsMax: 24,
      rows: 24,
      onChange: (event, value) => change(props.id, value)
    })
  )
)(template);
