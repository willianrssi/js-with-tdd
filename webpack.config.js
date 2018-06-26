const { join } = require('path');

module.exports = {
  entry: {
    filename: join(__dirname, 'index.js')
  },
  output: {
    path: join(__dirname, '.', 'dist'),
    libraryTarget: 'umd',
    library: 'SpotifyWrapper'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
