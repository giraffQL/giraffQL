const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader'
      }
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },
};