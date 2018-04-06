'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Doc } from '../redux/actions';
import { toArray, propertyStatus } from './common';
import { Document } from '../components/doc';

class DocumentContainer extends React.Component {
  render() {
    return <Document {...this.props} />;
  }
}

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
      type: propertyStatus(config.documentProperties, 'type'),
      doc: {
        ...props.doc,
        type: toArray(props.doc.type),
        title: propertyStatus(config.documentProperties, 'title') && props.doc.title
        || props.doc.desc || '',
        onTouchTap: () => edit(props.doc)
      }
    })
  )
)(DocumentContainer);
