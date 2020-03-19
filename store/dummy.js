const db = {
  'user': [
    { id: 1, name: 'Facundo'},
    { id: 2, name: 'Pedro'},
    { id: 3, name: 'Matias'},
    { id: 4, name: 'Raul'},
    { id: 5, name: 'Pablo'},
  ]
};

function list(table) {
  return db[table];
}

function get(table, id) {
  let collection = list(table)

  return collection.filter(item => item.id === id)[0] || null;
}

function upsert(table, data) {
  db[table].push(data);
}

function remove(table, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove
}