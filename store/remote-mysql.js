const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.mysqlService.protocol, config.mysqlService.host, config.mysqlService.port);