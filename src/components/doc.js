'use strict';

import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { timeSince } from 'date-utils';
import PropTypes from 'prop-types';
import { lastUpdate } from '../redux/db';

const style = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: 14
};

const renderSubtitle = (doc, flag) => {
  if (flag) {
    return <div>{timeSince(new Date(lastUpdate(doc)))}<br />{doc.type}</div>;
  } else {
    return <div>{timeSince(new Date(lastUpdate(doc)))}</div>;
  }
};

export class Document extends React.Component {
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

Document.propTypes = {
  doc: PropTypes.object,
  type: PropTypes.bool
};
