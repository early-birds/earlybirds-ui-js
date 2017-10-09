var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
//  plugins: [new BundleAnalyzerPlugin()],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }]
  },
}
