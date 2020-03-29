const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// Router
app.use('/api/posts', post);

// We use this middleware here because we want execute this after any other execution.
app.use(errors);

app.listen(config.posts.port, () => {
  console.log('Posts listening on port', config.posts.port)
})