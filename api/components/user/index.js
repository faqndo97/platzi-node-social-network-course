let store;
const config = require('../../../config');
const controller = require('./controller');

if (config.remoteDB === "true") {
  store = require('../../../store/remote-mysql');
} else {
  store = require('../../../store/mysql');
}

module.exports = controller(store);