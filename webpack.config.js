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
   ],
 },
 resolve: {
   modules: [
     path.join(__dirname, 'node_modules'),
   ],
 },
};