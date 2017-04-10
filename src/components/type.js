'use strict';

import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Type } from '../redux/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

let template = React.createClass({
  propTypes: {
    select: React.PropTypes.object,
    types: React.PropTypes.array
  },

  render() {
    return (
      <SelectField {...this.props.select}>
        {this.props.types.map((t, i) => (
          <MenuItem key={i} value={t} primaryText={t} />
        ))}
      </SelectField>
    );
  }
});

const selectionRenderer = (values) => {
  switch (values.length) {
  case 0:
    return 'Select type(s)...';
  case 1:
    return values[0];
  default:
    return `${values.length} types selected`;
  }
};

export default connect(
  state => ({ type: state.type }),
  { set: Type.set },
  createSelector(
    state => state.type,
    (state, actions) => actions.set,
    (type, set) => ({
      types: type.types,
      select: {
        multiple: true,
        value: type.selected,
        onChange: (event, index, values) => set(values),
        selectionRenderer,
        style: {
          paddingLeft: 10
        }
      }
    })
  )
)(template);
