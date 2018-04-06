'use strict';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import TextArea from 'react-textarea-autosize';
import PropTypes from 'prop-types';

const style = {
  padding: 16,
  border: 0,
  flex: 10
};

export class Writer extends React.Component {
  render() {
    let { editor } = this.props;

    if (editor) {
      return (<TextArea {...this.props.writer} style={{overflow: 'hidden', ...style}} />);
    } else {
      return (
        <div style={style}>
          <ReactMarkdown source={this.props.writer.value} />
        </div>
      );
    }
  }
}

Writer.propTypes = {
  writer: PropTypes.object,
  editor: PropTypes.bool
};
