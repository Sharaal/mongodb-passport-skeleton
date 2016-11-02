const path = require('path');

module.exports = {
  id: path.basename(__filename),
  up: async function (done) {
    const db = this.db;

    const authentications = db.collection('authentications');
    await authentications.createIndex({ name: 1 }, { unique: true });

    const users = db.collection('users');
    await users.createIndex({ name: 1 }, { unique: true });

    done();
  },
  down: async function (done) {},
};
