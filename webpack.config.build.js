var DefinePlugin = require('webpack').DefinePlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

module.exports = {
  context: __dirname,
  entry: './src',
  output: {
    path: 'dist',
    filename: '[hash].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
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
    new DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new ExtractTextPlugin('[contenthash].css'),
    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new UglifyJsPlugin(),
  ],
};
