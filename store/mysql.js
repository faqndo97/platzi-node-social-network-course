const mysql = require('mysql');

const config = require('../config');

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
}

let connection;

function handleConn() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error('[DB err]', err);
      setTimeout(handleConn, 2000);
    } else {
      console.log('DB connected')
    }
  })

  connection.on('error', err => {
    console.error('[DB err]', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConn();
    } else {
      throw err;
    }
  })
}

handleConn();

function list (table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  })
}

module.exports = {
  list
}