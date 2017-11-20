const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const bodyParser = require('body-parser');
 
const compiler = webpack(webpackConfig);
 
//GRAPHQL dependencies//
const graphQLHTTP = require('express-graphql');
// const schema = require('./src/components/graphql/schema');
// const mockedSchema = require('./src/components/graphql/mockSchema');
const schema = require('./src/components/graphql/mockSchema');

app.use(express.static(__dirname + '/public'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GRAPHQL//
app.use('/graphql', graphQLHTTP({
  schema,
  graphiql: true
}));
 
const server = app.listen(8000, function() {
//   const host = server.address().address;
  const port = server.address().port;
  console.log(`Is it over ${port}?!?!`);
});