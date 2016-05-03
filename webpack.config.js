var HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src',
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'baggage-loader?[file.css]=style',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};
