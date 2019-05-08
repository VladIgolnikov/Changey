var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'client/src');
var BUILD_DIR = path.resolve(__dirname, 'client/dist');

var config = {
  entry: APP_DIR + '/index.jsx',
  module: {
    rules: [
      {
        test : /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
