'use strict';

import React from 'react';
import { Doc } from '../../redux/actions';
import { chipStyle } from '../../styles';
import { CompanyChip, DateChip, ProductChip, TypeChip } from './chip';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const template = React.createClass({
  propTypes: {
    onTouchTap: React.PropTypes.func,
    date: React.PropTypes.object,
    type: React.PropTypes.object,
    company: React.PropTypes.object,
    product: React.PropTypes.object
  },

  render() {
    let { onTouchTap, date, type, company, product } = this.props;

    return (
      <div style={chipStyle} onTouchTap={onTouchTap}>
        {date}
        {type}
        {company}
        {product}
      </div>
    );
  }
});

export default connect(
  (state, props) => ({
    props,
    config: state.config
  }),
  { edit: Doc.edit },
  createSelector(
    state => state.props,
    state => state.config,
    (state, actions) => actions.edit,
    (props, config, edit) => ({
      date: DateChip(new Date(props.doc.updated || props.doc._id)
      .toLocaleDateString(config.locale, {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })),
      type: TypeChip(props.doc.type),
      company: CompanyChip(props.doc.company),
      product: ProductChip(props.doc.product),
      onTouchTap: () => edit(props.doc)
    })
  )
)(template);
