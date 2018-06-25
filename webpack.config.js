const { join } = require('path');

module.exports = {
  entry: {
    filename: join(__dirname, '.', 'src', 'index.js')
  },
  output: {
    path: join(__dirname, '.', 'dist'),
    libraryTarget: 'umd',
    library: 'spotifyWrapper'
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
