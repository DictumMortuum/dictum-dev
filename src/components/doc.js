'use strict';

import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import store from '../redux/store';
import { toEditor } from '../redux/actions/editor';
import RaisedButton from 'material-ui/RaisedButton';
import ReactMarkdown from 'react-markdown';
import { docStyle, docInlineStyle } from '../styles/app';

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object,
    index: React.PropTypes.number
  },

  render() {
    let { config, doc } = this.props;

    return (
      <Card zDepth={1}>
        <CardHeader
          title={new Date(doc.date).toLocaleDateString(config.locale, {
            weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          children={(
            <div>
              <div style={docStyle}>
                {doc.type !== '' && <div style={docInlineStyle}>{doc.type}</div>}
                {doc.company !== '' && <div style={docInlineStyle}>{doc.company}</div>}
                {doc.product !== '' && <div style={docInlineStyle}>{doc.product}</div>}
              </div>
            </div>
          )}
          style={{
            backgroundColor: '#E0F2F1'
          }}
          onTouchTap={() => {
            store.dispatch(toEditor(doc));
          }}
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
            labelStyle={{fontFamily: 'monospace'}}
          />}
          {doc.lang.map(l => {
            return (
              <FlatButton key={l} label={l} style={{fontFamily: 'monospace'}} />
            );
          })}
        </CardActions>
      </Card>
    );
  }
});
