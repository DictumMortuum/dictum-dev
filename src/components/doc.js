'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Card, CardTitle } from 'material-ui/Card';
import { Doc } from '../redux/actions';
import { timeSince } from 'date-utils';
import PropTypes from 'prop-types';
import { toArray } from './common';

const style = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 14
};

class tpl extends React.Component {
  render() {
    let { doc } = this.props;

    return (
      <Card onTouchTap={doc.onTouchTap}>
        <CardTitle
          titleStyle={style}
          title={doc.desc}
          subtitle={<div>{timeSince(new Date(doc._id))}<br />{doc.type}</div>}
        />
      </Card>
    );
  }
}

tpl.propTypes = {
  doc: PropTypes.object
};

export default connect(
  (state, props) => ({ props }),
  { edit: Doc.edit },
  createSelector(
    state => state.props,
    (state, actions) => actions.edit,
    (props, edit) => ({
      doc: {
        ...props.doc,
        type: toArray(props.doc.type),
        desc: props.doc.desc || '',
        onTouchTap: () => edit(props.doc)
      }
    })
  )
)(tpl);
