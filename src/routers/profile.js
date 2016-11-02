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
      if (req.accepts('html')) {
        if (user) {
          res.render('profile.ejs', { user });
        } else {
          res.sendStatus(404);
        }
      } else {
        res.send(user);
      }
    }
  );

  return router;
};
