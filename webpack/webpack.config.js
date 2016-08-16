var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackBundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './webpack/app.js',
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.(eot|ico|jpg|mp3|svg|ttf|woff2|woff|png?)($|\?)/, loader: 'file' },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015'] } },
      { test: /\.json$/, loader: 'json' },
      { test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
    ],
  },
  output: {
    filename: 'app.js',
    path: 'static',
    publicPath: '/static/',
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new WebpackBundleTracker({ filename: './webpack/stats.json' }),
  ],
}

// vi:et:sw=2:st=2
