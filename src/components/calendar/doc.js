'use strict';

import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import store from '../../redux/store';
import { toEditor } from '../../redux/actions/editor';

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { config, doc } = this.props;

    return (
      <Card zDepth={1}>
        <CardHeader
          title={doc.type}
          subtitle={new Date(doc.date).toLocaleTimeString(config.locale, {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          onTouchTap={() => store.dispatch(toEditor(doc))}
        />
        <CardText>
          {doc.desc}
        </CardText>
        {Array.isArray(doc.lang) &&
          <CardActions>
            {doc.lang.map(l => {
              return (
                <FlatButton key={l} label={l} />
              );
            })}
          </CardActions>
        }}
      </Card>
    );
  }
});
