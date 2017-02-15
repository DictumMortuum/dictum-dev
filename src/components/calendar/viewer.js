'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import store from '../../redux/store';
import { toEditor } from '../../redux/actions/editor';
import Doc from './doc';

let Viewer = React.createClass({
  propTypes: {
    editor: React.PropTypes.object,
    config: React.PropTypes.object
  },

  render() {
    let { editor, config } = this.props;

    // TODO - fix the list.
    return (
      <List>
        {editor.docs.map(d => {
          return (
            <div key={d._id}>
            <ListItem
              primaryText={d.date.toLocaleTimeString(config.locale, {
                hour: '2-digit', minute: '2-digit', second: '2-digit'
              })}
              onTouchTap={() => store.dispatch(toEditor(d))}
            />
            <Doc
              date={d._id}
              ticket={d.ticket}
              company={d.company}
              product={d.product}
              type={d.type}
              lang={d.lang}
              desc={d.desc}
              config={config}
            />
            </div>
          );
        }
        )}
      </List>
    );
  }
});

export default connect(state => {
  return {
    editor: state.editor,
    config: state.config
  };
})(Viewer);
