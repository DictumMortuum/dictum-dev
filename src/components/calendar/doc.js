'use strict';

import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
    desc: React.PropTypes.string,
    config: React.PropTypes.object
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

  handleToggle(expanded) {
    this.setState({expanded: expanded});
  },

  render() {
    // let { ticket, company, product, type, lang, desc, date } = this.props;
    let { type, lang, desc, date, config } = this.props;
    let { expanded } = this.state;

    return (
      <Card zDepth={0} expanded={expanded} onExpandChange={this.handleToggle}>
        <CardHeader
          title={new Date(date).toLocaleTimeString(config.locale, {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          subtitle={type}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText zDepth={0} expandable={true}>{desc}</CardText>
        <CardActions zDepth={0} expandable={true}>
          {lang.map(l => {
            return (
              <FlatButton key={l} label={l} />
            );
          })}
        </CardActions>
      </Card>
    );
  }
});
