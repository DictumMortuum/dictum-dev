'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import store from '../redux/store';
import React from 'react';
import { init } from '../redux/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { App } from '../components/app';
import Bar from './bar';
import Editor from './editor';
import Viewer from './viewer';
import Info from './info';
import Config from './config';

injectTapEventPlugin();

class AppContainer extends React.Component {
  componentDidMount() {
    store.dispatch(init());
  }

  render() {
    return (
      <App info={<Info />}>
        <Config />
        <Bar />
        <Viewer />
        <Editor />
      </App>
    );
  }
}

AppContainer.propTypes = {
  config: PropTypes.object
};

const mapStateToProps = state => ({
  config: state.config
});

export default connect(mapStateToProps)(AppContainer);
