'use strict';

import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

export default React.createClass({
  getInitialState() {
    return {
      expanded: false
    };
  },

  propTypes: {
    date: React.PropTypes.string,
    ticket: React.PropTypes.string,
    company: React.PropTypes.string,
    product: React.PropTypes.string,
    type: React.PropTypes.string,
    lang: React.PropTypes.array,
    desc: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      ticket: null,
      company: null,
      product: null,
      type: null,
      lang: [],
      desc: ''
    };
  },

  handleExpandChange(expanded) {
    this.setState({expanded: expanded});
  },

  render() {
    // let { ticket, company, product, type, lang, desc, date } = this.props;
    let { type, lang, desc, date } = this.props;

    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={new Date(date).toLocaleTimeString('el-GR', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          subtitle={type}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <div>{desc}</div>
          <div>{lang.map(l => {
            return (
              <div key={l} label={l} />
            );
          })}</div>
        </CardText>
      </Card>
    );
  }
});
