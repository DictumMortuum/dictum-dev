'use strict';

import React from 'react';
import { Type } from '../redux/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Types } from '../components/type';

class TypesContainer extends React.Component {
  render() {
    return <Types {...this.props} />;
  }
}

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
)(TypesContainer);
