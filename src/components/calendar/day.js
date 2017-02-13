'use strict';

import React from 'react';
import Doc from './doc';
import { dayStyle } from '../../styles/app';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';

let Day = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    month: React.PropTypes.string,
    docs: React.PropTypes.array,
    config: React.PropTypes.object
  },

  getInitialState() {
    return {
      expanded: this.props.config.expandedDay
    };
  },

  handleToggle(expanded) {
    this.setState({expanded: expanded});
  },

  render() {
    let { id, year, month, docs, config } = this.props;
    let { expanded } = this.state;
    // determine whether we need to sort docs or not here.
    let date = new Date(Date.UTC(year, month - 1, id, 0, 0, 0));
    let options = { month: 'short', day: 'numeric', weekday: 'long' };
    let locale = config.locale;

    return (
      <Card zDepth={0} expanded={expanded} onExpandChange={this.handleToggle}>
        <CardHeader
          style={dayStyle}
          title={date.toLocaleDateString(locale, options)}
          actAsExpander={true}
        />
        <CardText expandable={true}>
          {docs.map(d => {
            return (
              <div key={d._id}>
                <Doc
                  key={d._id}
                  date={d._id}
                  ticket={d.ticket}
                  company={d.company}
                  product={d.product}
                  type={d.type}
                  lang={d.lang}
                  desc={d.desc}
                  config={config}
                />
                <Divider />
              </div>
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
})(Day);
