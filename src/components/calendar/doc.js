'use strict';

import React from 'react';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import store from '../../redux/store';
import { toEditor } from '../../redux/actions/editor';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
  propTypes: {
    doc: React.PropTypes.object,
    config: React.PropTypes.object,
    index: React.PropTypes.number
  },

  render() {
    let { config, doc } = this.props;

    const style = {
      width: '100%',
      display: 'flex',
      flexDirection: 'row'
    };

    const inline = {
      flex: '1 0'
    };

    return (
      <Card zDepth={1}>
        <CardHeader
          subtitle={new Date(doc.date).toLocaleTimeString(config.locale, {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          children={(
            <div>
              <div style={style}>
                <div style={inline}>{doc.type}</div>
                <div style={inline}>{doc.company}</div>
                <div style={inline}>{doc.product}</div>
              </div>
            </div>
          )}
          style={{
            backgroundColor: '#E0F2F1'
          }}
          onTouchTap={() => {
            store.dispatch(toEditor(doc, this.props.index));
          }}
        />
        <CardText>
          {doc.desc}
        </CardText>
        <CardActions>
          {doc.ticket && <RaisedButton primary={true} key='ticket' label={doc.ticket} />}
          {doc.lang.map(l => {
            return (
              <FlatButton key={l} label={l} />
            );
          })}
        </CardActions>
      </Card>
    );
  }
});
