const bcrypt = require('bcrypt');

module.exports = {
  hash: (password, saltRounds = 10) => new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  }),
  verify: (password, passwordHash) => new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  })
};
