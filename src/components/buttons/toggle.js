'use strict';

import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';

export default React.createClass({
  render() {
    return (
      <IconButton {...this.props}>
        <ActionVisibility />
      </IconButton>
    );
  }
});
