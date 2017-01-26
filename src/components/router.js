'use strict';

import About from './about';
import App from './app';
import Index from './index';
import NoMatch from './no-match';
import React from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

export default React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route name="root" path="/" component={App}>
          <IndexRoute name="index" component={Index} />
          <Route name="about" path="about" component={About}/>
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
    );
  }
});
