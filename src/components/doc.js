'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Card, CardTitle } from 'material-ui/Card';
import { Doc } from '../redux/actions';

const style = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 14
};

const template = React.createClass({
  propTypes: {
    doc: React.PropTypes.object
  },

  render() {
    let { doc } = this.props;

    return (
      <Card onTouchTap={doc.onTouchTap}>
        <CardTitle
          titleStyle={style}
          title={doc.desc}
          subtitle={<div>{doc._id} {doc.lang.toString()}</div>}
        />
      </Card>
    );
  }
});

export default connect(
  (state, props) => ({ props }),
  { edit: Doc.edit },
  createSelector(
    state => state.props,
    (state, actions) => actions.edit,
    (props, edit) => ({
      doc: {
        ...props.doc,
        desc: props.doc.desc || '',
        lang: props.doc.lang || [],
        onTouchTap: () => edit(props.doc)
      }
    })
  )
)(template);
