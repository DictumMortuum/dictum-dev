'use strict';

let path = require('path');
let node = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      exclude: [node],
      loader: 'babel-loader'
    }]
  }
};
