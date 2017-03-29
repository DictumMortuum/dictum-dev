import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';

let template = React.createClass({
  propTypes: {
    type: React.PropTypes.object
  },

  render() {
    let { type } = this.props;
    let { types } = type;

    return (
      <SelectField style={{marginRight: 10}} labelStyle={{color: 'white'}}>
        {types.map((t, i) => (<MenuItem key={i} value={t} primaryText={t} />))}
      </SelectField>
    );
  }
});

export default connect(state => ({ type: state.type }))(template);
