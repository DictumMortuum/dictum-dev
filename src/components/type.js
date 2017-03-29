import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Type } from '../redux/actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

let template = React.createClass({
  propTypes: {
    value: React.PropTypes.array,
    selected: React.PropTypes.array
  },

  render() {
    console.log(this.props.selected);
    return (
      <SelectField {...this.props} style={{marginRight: 10}} labelStyle={{color: 'white'}}>
        {this.props.value.map((t, i) => (
          <MenuItem
            key={i}
            value={t}
            primaryText={t}
            checked={false}
            insetChildren={true}
          />
        ))}
      </SelectField>
    );
  }
});

const selectionRenderer = (values) => {
  switch (values.length) {
  case 0:
    return '';
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
      multiple: true,
      value: type.types,
      selected: type.selected,
      onChange: (event, index, values) => set(values),
      selectionRenderer
    })
  )
)(template);
