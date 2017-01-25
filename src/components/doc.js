'use strict';

import React from 'react';
import MUI from 'material-ui';
const { Card, CardHeader, CardText, FloatingActionButton } = MUI;
const { Divider, FlatButton, FontIcon } = MUI;

export default React.createClass({

  propTypes: {
    date: React.PropTypes.object,
    ticket: React.PropTypes.string,
    company: React.PropTypes.string,
    product: React.PropTypes.string,
    type: React.PropTypes.string,
    lang: React.PropTypes.array,
    text: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      ticket: null,
      company: null,
      product: null,
      type: null,
      lang: [],
      desc: ""
    };
  },

  formatDate(date) {
    return new Date(date).toLocaleTimeString('el-GR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  },

  formatLang(lang) {
    return lang.map(l => {
      return (
        <FlatButton key={l} label={l} />
      );
    })
  },

  render() {
    let { ticket, company, product, type, lang, desc, date } = this.props;

    return (
      <Card>
        <CardHeader
          title={formatDate(date)}
          subtitle={type}
        />
        <CardText>{desc}</CardText>
        <Divider />
        <div>{formatLang(lang)}</div>
      </Card>
    );
  }
});
