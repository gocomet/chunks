// npm i webpack -S
// npm i babel-loader babel-preset-es2015 babel-preset-react -S
// npm i react react-dom -S
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  }
};

module.exports = config;
