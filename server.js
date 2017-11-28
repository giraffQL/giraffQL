const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const bodyParser = require('body-parser');
const graphQLHTTP = require('express-graphql');
const { GraphQLSchema, buildSchema, printSchema } = require('graphql');
const { InMemoryBlobStore } = require('./src/components/graphql/InMemoryBlobStore');
const { buildDummySchema } = require('./src/components/graphql/buildDummySchema');
 
const compiler = webpack(webpackConfig);
const blobStore = new InMemoryBlobStore();

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/schemas/:schemaId/graphql', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    blobStore.fetch(req.params.schemaId).then((blob) => {
      if (blob) {
        const schema = buildDummySchema(blob);
        graphQLHTTP({schema: schema, graphiql: true})(req, res);
      } else {
        res.send(404);
      }
    });
  }
});

app.post('/schemas', (req, res) => {
  const blob = req.body.schema;
  const schema = buildSchema(blob);
  const normalizedSchema = printSchema(schema);
  blobStore.add(normalizedSchema).then((digest) => {
    res.redirect(`/schemas/${digest}/graphql`);
  });
});

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 
const server = app.listen(8000, function() {
  const port = server.address().port;
  console.log(`Is it over ${port}?!?!`);
});