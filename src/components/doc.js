'use strict';

import React from 'react';
import { Card, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import store from '../redux/store';
import { Doc, Filter } from '../redux/actions';
import ReactMarkdown from 'react-markdown';
import { chipStyle, font } from '../styles';
import Jira from './jira';
import { CompanyChip, DateChip, ProductChip, TypeChip } from './chip';

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { config, doc } = this.props;

    return (
      <Card style={{marginBottom: 20}}>
        <div style={chipStyle}
          onTouchTap={() => store.dispatch(Doc.edit(doc))}>
          {DateChip(new Date(doc.updated || doc._id).toLocaleDateString(config.locale, {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          }))}
          {TypeChip(doc.type)}
          {CompanyChip(doc.company)}
          {ProductChip(doc.product)}
        </div>
        <CardText>
          <ReactMarkdown source={doc.desc || ''} />
        </CardText>
        <CardActions>
          {doc.ticket && <Jira ticket={doc.ticket} />}
          {doc.lang && doc.lang.map(l => (<RaisedButton
            key={l}
            label={l}
            style={font}
            onTouchTap={() => store.dispatch(Filter.toggle(l))}
          />))}
        </CardActions>
      </Card>
    );
  }
});
