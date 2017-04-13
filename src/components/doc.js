'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Card, CardTitle } from 'material-ui/Card';
import { Doc } from '../redux/actions';
import { timeSince } from 'date-utils';
import PropTypes from 'prop-types';
import { toArray, propertyStatus } from './common';

const style = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 14
};

const renderSubtitle = (doc, flag) => {
  if (flag) {
    return <div>{timeSince(new Date(doc.updated || doc._id))}<br />{doc.type}</div>;
  } else {
    return <div>{timeSince(new Date(doc.updated || doc._id))}</div>;
  }
};

class tpl extends React.Component {
  render() {
    let { doc, type } = this.props;

    return (
      <Card onTouchTap={doc.onTouchTap}>
        <CardTitle
          titleStyle={style}
          title={doc.title}
          subtitle={renderSubtitle(doc, type)}
        />
      </Card>
    );
  }
}

tpl.propTypes = {
  doc: PropTypes.object,
  type: PropTypes.bool
};

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
)(tpl);
