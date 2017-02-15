'use strict';

import React from 'react';
import filter from './filter';
import Month from './month';
import {List, ListItem} from 'material-ui/List';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    docs: React.PropTypes.array
  },

  render() {
    let { id, docs } = this.props;
    // need to adjust month by + 1 to get the correct one.
    // it seems that they are 0-indexed.
    let months = filter(docs, d => d.getMonth() + 1);

    return (
      <List>
        <ListItem
          primaryText={id}
          primaryTogglesNestedList={true}
          initiallyOpen={false}
          style={{backgroundColor: '#82B1FF'}}
          nestedItems={
            months.map(m => {
              return (
                <Month key={m.id} id={m.id} year={id} docs={m.docs} />
              );
            })
          }
        />
      </List>
    );
  }
});
