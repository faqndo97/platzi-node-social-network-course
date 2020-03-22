const nanoid = require('nanoid');
const auth = require('../auth');

const TABLE = 'users';

module.exports = function(injectedStore) {
  let store = injectedStore || require('../../../store/dummy');

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
  }

  async function upsert(data) {
    const user = {
      name: data.name,
      username: data.username
    }

    if (data.id) {
      user.id = data.id
    } else {
      user.id = nanoid();
    }

    if (data.password || data.username) {
      await auth.upsert({
        id: user.id,
        username: data.username,
        password: data.password
      })
    }

    store.upsert(TABLE, user);

    return user;
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  return {
    list,
    get,
    upsert,
    remove
  }
}