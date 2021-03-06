const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common');

module.exports = Merge(CommonConfig, {
  // source-maps
  devtool: 'cheap-module-eval-source-map',

  // output
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  // loaders
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },

  // dev-server
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3001,
    stats: "errors-only",
    open: true,
    openPage: '',
    historyApiFallback: {
      index: '/'
    },
    hot: true
  },

  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HN Preact',
      template: './src/index.ejs',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './sw-dev.js'), 'utf-8')}</script>`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
