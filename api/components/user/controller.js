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
    let action = 'INSERT';
    const user = {
      name: data.name,
      username: data.username
    }

    if (data.id) {
      user.id = data.id;
      action = 'UPDATE';
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

    store.upsert(TABLE, user, action);

    return user;
  }

  function remove(id) {
    return store.remove(TABLE, id);
  }

  function follow(from, to) {
    return store.upsert(TABLE + '_follows', {
      user_from: from,
      user_to: to
    }, 'INSERT')
  }

  function following(user) {
    const join = [];
    join[TABLE] = 'user_to';
    const query = { user_from: user };
    
    return await store.query(TABLE + '_follow', query, join);
  }

  return {
    list,
    get,
    upsert,
    remove,
    follow,
    following
  }
}