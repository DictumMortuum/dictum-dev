'use strict';

import React from 'react';
import { dayStyle } from '../../styles/app';
import { ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { toViewer, toEditor } from '../../redux/actions/editor';

let Day = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    year: React.PropTypes.string,
    month: React.PropTypes.string,
    docs: React.PropTypes.array,
    config: React.PropTypes.object,
    color: React.PropTypes.bool
  },

  render() {
    let { id, year, month, config, color, docs } = this.props;
    // determine whether we need to sort docs or not here.
    let date = new Date(Date.UTC(year, month - 1, id, 0, 0, 0));
    let options = { weekday: 'long', day: 'numeric' };
    let locale = config.locale;

    return (
      <ListItem
        innerDivStyle={
          color === true ?
          dayStyle : Object.assign({}, dayStyle, { backgroundColor: '#ECEFF1' })
        }
        primaryText={date.toLocaleDateString(locale, options)}
        onTouchTap={
          () => {
            store.dispatch(toViewer(docs));

            if (docs.length > 0) {
              store.dispatch(toEditor(docs[0]));
            }
          }
        }
      />
    );
  }
});

export default connect(state => {
  return {
    config: state.config
  };
})(Day);
