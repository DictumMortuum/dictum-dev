'use strict';

import React from 'react';
import { Card, CardText, CardActions } from 'material-ui/Card';
import ReactMarkdown from 'react-markdown';
import Jira from './doc/jira';
import Filter from './doc/filter';
import Header from './doc/header';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const template = React.createClass({
  propTypes: {
    doc: React.PropTypes.object
  },

  render() {
    let { doc } = this.props;

    return (
      <Card style={{marginBottom: 20}}>
        <Header doc={doc} />
        <CardText>
          <ReactMarkdown source={doc.desc} />
        </CardText>
        <CardActions>
          {doc.ticket && <Jira ticket={doc.ticket} />}
          {doc.lang.map(l => (<Filter key={l} lang={l} />))}
        </CardActions>
      </Card>
    );
  }
});

export default connect(
  (state, props) => ({ props }),
  {},
  createSelector(
    state => state.props,
    props => ({
      doc: {
        ...props.doc,
        desc: props.doc.desc || '',
        lang: props.doc.lang || []
      }
    })
  )
)(template);
