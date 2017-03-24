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

let DocLang = React.createClass({
  propTypes: {
    lang: React.PropTypes.string
  },

  render() {
    let { lang } = this.props;

    return (
      <RaisedButton
        label={lang}
        style={font}
        onTouchTap={() => store.dispatch(Filter.toggle(lang))}
      />
    );
  }
});

let DocActions = React.createClass({
  propTypes: {
    ticket: React.PropTypes.string,
    lang: React.PropTypes.array
  },

  render() {
    let { ticket, lang } = this.props;

    return (
      <CardActions>
        {ticket && <Jira ticket={ticket} />}
        {lang && lang.map(l => (<DocLang key={l} lang={l} />))}
      </CardActions>
    );
  }
});

let DocHeader = React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { doc, config } = this.props;

    return (
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
    );
  }
});

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object
  },

  render() {
    let { doc } = this.props;

    return (
      <Card style={{marginBottom: 20}}>
        <DocHeader {...this.props} />
        <CardText>
          <ReactMarkdown source={doc.desc || ''} />
        </CardText>
        <DocActions ticket={doc.ticket} lang={doc.lang} />
      </Card>
    );
  }
});
