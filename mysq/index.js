const express     = require('express');
const bodyParser  = require('body-parser');

const config = require('../config')
const errors = require('../network/errors');
const router = require('./network');

const app = express();

app.use(bodyParser.json());
app.use('/', router);

app.use(errors);

app.listen(config.mysqlService.port, () => {
  console.log('Mysql service listening on port', config.mysqlService.port);
})