'use strict';

import React from 'react';
import MUI from 'material-ui';
const { Card, CardHeader, CardText, FloatingActionButton } = MUI;
const { Divider, FlatButton, FontIcon } = MUI;

export default React.createClass({

  propTypes: {
    doc: React.PropTypes.object,
    ticket: React.PropTypes.string,
    lang: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      ticket: null,
      lang: []
    };
  },

  render() {
    let { lang } = this.props;

    const date = new Date(this.props.doc._id).toLocaleTimeString('el-GR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const avatar = (
      <FloatingActionButton
        mini={true} secondary={true}
        onTouchTap={this.handleDelete}
        zDepth={1}
      >
        <FontIcon className="material-icons">clear</FontIcon>
      </FloatingActionButton>
    );

    return (
      <Card>
        <CardHeader
          title={date}
          subtitle={this.props.doc.type}
          avatar={avatar}
        />
        <CardText>{this.props.doc.desc}</CardText>
        <Divider />
        <div>
        {lang.map(l => {
          return (
            <FlatButton key={l} label={l} />
          );
        })}
        </div>
      </Card>
    );
  }
});
