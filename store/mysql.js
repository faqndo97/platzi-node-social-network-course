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
    connection.query(`SELECT * FROM ${table}`, (err, result) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(result)));
    })
  })
}

function get (table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, result) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(result)));
    })
  })
}

function insert (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(result)));
    })
  })
}

function update (table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (err, result) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(result)));
    })
  })
}

function upsert(table, data, action) {
  if (action === 'UPDATE') return update(table, data);

  return insert(table, data);
}

function remove(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id = '${id}'`, (err, result) => {
      if (err) return reject(err);
      resolve(JSON.parse(JSON.stringify(result)));
    })
  })
}

function query(table, query, join) {
  let joinQuery = '';

  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];

    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ?`, query, (err, result) => {
      if (err) return reject(err);

      if (result.length > 0) {
        resolve(JSON.parse(JSON.stringify(result[0])) || null);
      } else {
        resolve(null);
      }
      
    })
  })
}


module.exports = {
  list,
  get,
  insert,
  update,
  upsert,
  remove,
  query
}