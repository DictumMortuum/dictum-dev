'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Card, CardText } from 'material-ui/Card';

const style = {
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const template = React.createClass({
  propTypes: {
    doc: React.PropTypes.object
  },

  render() {
    let { doc } = this.props;

    return (
      <Card>
        <CardText style={style}>{doc.desc}</CardText>
      </Card>
    );
  }
});

export default connect(
  (state, props) => ({ props }),
  {},
  createSelector(
    state => state.props,
    props => ({
      doc: {
        ...props.doc,
        desc: props.doc.desc || '',
        lang: props.doc.lang || []
      }
    })
  )
)(template);
