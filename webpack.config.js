module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        plugins: [
          "add-module-exports"
        ]
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
