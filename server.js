const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const app = express();
const config = require('./webpack.config.js');

const compiler = webpack(config);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);

app.listen(8080);
