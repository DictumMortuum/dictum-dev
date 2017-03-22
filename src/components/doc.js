'use strict';

import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import store from '../redux/store';
import { Doc } from '../redux/actions';
import ReactMarkdown from 'react-markdown';
import { flexParent, docStyle, docInfoStyle, font } from '../styles';
import Jira from './jira';

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { config, doc } = this.props;

    return (
      <Card style={{marginBottom: 10}} zDepth={1}>
        <CardHeader
          title={new Date(doc.updated || doc._id).toLocaleDateString(config.locale, {
            weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          children={(
            <div style={flexParent}>
              {[doc.type, doc.company, doc.product].map(d => (
                <div key={d} style={docInfoStyle}>{d || ''}</div>
              ))}
            </div>
          )}
          style={docStyle}
          onTouchTap={() => store.dispatch(Doc.edit(doc))}
        />
        <CardText>
          <ReactMarkdown source={doc.desc || ''} />
        </CardText>
        <CardActions>
          {doc.ticket && <Jira ticket={doc.ticket} />}
          {doc.lang && doc.lang.map(l => (<FlatButton key={l} label={l} style={font} />))}
        </CardActions>
      </Card>
    );
  }
});
