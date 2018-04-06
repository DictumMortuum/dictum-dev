'use strict';

import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';

export class Types extends React.Component {
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
