'use strict';

let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: '.eslintrc'
        }
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /.*\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: path.join(__dirname, 'src'),
        loaders: ['react-hot-loader', 'babel-loader']
      }
    ]
  }
};
