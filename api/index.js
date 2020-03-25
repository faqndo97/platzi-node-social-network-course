const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());

// Router
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/posts', post);

// We use this middleware here because we want execute this after any other execution.
app.use(errors);

app.listen(config.api.port, () => {
  console.log('Api escuchando en el puerto', config.api.port)
})