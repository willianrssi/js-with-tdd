const { join } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    filename: join(__dirname, '.', 'src', 'index.js')
  },
  output: {
    path: join(__dirname, '.', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015'
          ]
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: { warnings: false },
        output: { comments: false },
        sourceMap: true
      }
    })
  ]
};
