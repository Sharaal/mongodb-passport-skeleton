module.exports = async ({ db, ensureLoggedIn }) => {
  const users = db.collection('users');

  const router = require('express').Router();

  router.get('/profile',
    ensureLoggedIn,
    (req, res) => {
      res.render('profile.ejs', { user: req.user });
    }
  );

  router.get('/profile/:name',
    async (req, res) => {
      const user = await users.findOne({ name: req.params.name });
      if (user) {
        if (req.accepts('html')) {
          res.render('profile.ejs', { user });
        } else {
          res.send(user);
        }
      } else {
        res.sendStatus(404);
      }
    }
  );

  return router;
};
