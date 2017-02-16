'use strict';

import React from 'react';
import filter from './filter';
import Day from './day';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';

let Month = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    docs: React.PropTypes.array,
    config: React.PropTypes.object,
    expanded: React.PropTypes.bool
  },

  render() {
    let { id, year, docs, config, expanded } = this.props;
    let days = filter(docs, d => d.getDate());
    let date = new Date(Date.UTC(year, id, 0, 0, 0, 0));
    let options = { month: 'long' };
    let locale = config.locale;

    return (
      <ListItem
        primaryText={date.toLocaleDateString(locale, options)}
        primaryTogglesNestedList={true}
        initiallyOpen={expanded}
        nestedListStyle={{padding: 10}}
        // TODO move inline css to styles
        style={{backgroundColor: '#CFD8DC'}}
        nestedItems={
          days.map((d, i) => {
            return (
              <Day key={d.id} id={d.id} year={year} month={id} docs={d.docs}
                color={i%2 ? true : false } />
            );
          })
        }
      />
    );
  }
});

export default connect(state => {
  return {
    config: state.config
  };
})(Month);
