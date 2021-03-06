'use strict';

import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Type } from '../redux/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

class Types extends React.Component {
  render() {
    return (
      <SelectField {...this.props.select}>
        {this.props.types.map((t, i) => (
          <MenuItem key={i} value={t} primaryText={t} />
        ))}
      </SelectField>
    );
  }
}

Types.propTypes = {
  select: PropTypes.object,
  types: PropTypes.array
};

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
)(Types);
