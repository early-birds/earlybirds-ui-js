module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-2'],
      }
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1',
        'postcss-loader',
      ],
    }]
  },
}
