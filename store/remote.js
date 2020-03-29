const request = require('request');

function createRemoteDB(protocol, host, port){
  const URL = `${protocol}://${host}:${port}`

  function list(table) {
    return req('GET', table)
  }

  function get(table, id) {}
  function insert(table, data) {}
  function update(table) {}
  function remove(table) {}
  function query(table) {}

  function req(method, table, data) {
    let url =  `${URL}/${table}`;
    let body;

    return new Promise((resolve, reject) => {
      request({
        method,
        header: {
          'content-type': 'application/json'
        },
        url,
        body
      }, (err, req, body) => {
        if (err) {
          console.error(err);
          return reject(err.message);
        }

        return resolve(JSON.parse(body).body);
      })
    })
  }

  return {
    list
  }
}

module.exports = createRemoteDB;