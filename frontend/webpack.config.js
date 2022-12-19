const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  html: path.resolve(__dirname, 'src', 'index.html'),
  target: path.resolve(__dirname, 'public'),
};

const rules = {
  typescript: {
    test: /\.tsx?$/,
    loader: 'ts-loader',
  },
};

const plugins = {
  clean: new CleanWebpackPlugin(),
  html: new HtmlWebpackPlugin({
    template: paths.html,
  }),
};

module.exports = {
  entry: paths.entry,
  output: {
    filename: '[name].js',
    path: paths.target,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [rules.typescript],
  },
  plugins: [plugins.clean, plugins.html],
};
