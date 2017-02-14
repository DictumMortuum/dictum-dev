'use strict';

import React from 'react';
import filter from './filter';
import Day from './day';
import { monthStyle } from '../../styles/app';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';

let Month = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    docs: React.PropTypes.array,
    config: React.PropTypes.object
  },

  getInitialState() {
    return {
      expanded: false
    };
  },

  handleToggle(expanded) {
    this.setState({expanded: expanded});
  },

  render() {
    let { id, year, docs, config } = this.props;
    let { expanded } = this.state;
    let days = filter(docs, d => d.getDate());
    let date = new Date(Date.UTC(year, id, 0, 0, 0, 0));
    let options = { year: 'numeric', month: 'long' };
    let locale = config.locale;
    return (
      <Card expanded={expanded} onExpandChange={this.handleToggle}>
        <CardHeader
          style={monthStyle}
          title={date.toLocaleDateString(locale, options)}
          actAsExpander={true}
        />
        <CardText expandable={true}>
          {days.map(d => {
            return (
              <Day key={d.id} id={d.id} year={year} month={id} docs={d.docs} />
            );
          })}
        </CardText>
      </Card>
    );
  }
});

export default connect(state => {
  return {
    config: state.config
  };
})(Month);
