'use strict';

Array.prototype.unique = function () {
  let hash = {};
  let result = [];

  for (let i = 0, l = this.length; i < l; i++) {
    if (!hash.hasOwnProperty(this[i])) {
      hash[ this[i] ] = true;
      result.push(this[i]);
    }
  }

  return result;
};

Array.prototype.uniqueCount = function () {
  let hash = {};
  let result = [];

  for (let i = 0, l = this.length; i < l; i++) {
    if (!hash.hasOwnProperty(this[i])) {
      hash[ this[i] ] = 1;
    } else {
      hash[ this[i] ]++;
    }
  }

  for (let k in hash) {
    if (hash.hasOwnProperty(k)) {
      result.push({
        tag: k,
        count: hash[k]
      });
    }
  }

  return result.sort((a, b) => b.count - a.count);
};

import { Provider } from 'react-redux';
import Router from './components/router';
import React from 'react';
import { render } from 'react-dom';
import store from './redux/store';

render(
  <Provider store={store}>
    <Router />
  </Provider>
  , document.getElementById('app')
);
