'use strict';

import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import store from '../redux/store';
import { toEditor } from '../redux/actions/editor';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';
import { flexParent, docStyle, docInfoStyle, font } from '../styles/app';

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object,
    index: React.PropTypes.number
  },

  render() {
    let { config, doc } = this.props;

    return (
      <Card style={{marginBottom: 10}} zDepth={1}>
        <CardHeader
          title={new Date(doc.date).toLocaleDateString(config.locale, {
            weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          children={(
            <div style={flexParent}>
              {doc.type !== '' && <div style={docInfoStyle}>{doc.type}</div>}
              {doc.company !== '' && <div style={docInfoStyle}>{doc.company}</div>}
              {doc.product !== '' && <div style={docInfoStyle}>{doc.product}</div>}
            </div>
          )}
          style={docStyle}
          onTouchTap={() => store.dispatch(toEditor(doc))}
        />
        <CardText>
          <ReactMarkdown source={doc.desc} />
        </CardText>
        <CardActions>
          {doc.ticket && <RaisedButton
            primary={true}
            key='ticket'
            label={doc.ticket}
            href={config.jiraPrefix + doc.ticket}
            labelStyle={font}
          />}
          {doc.lang.map(l => (<FlatButton key={l} label={l} style={font} />))}
        </CardActions>
      </Card>
    );
  }
});
