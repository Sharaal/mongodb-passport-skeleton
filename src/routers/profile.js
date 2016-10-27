module.exports = ({ ensureLoggedIn }) => {
  const router = require('express').Router();

  router.get('/profile',
    ensureLoggedIn,
    (req, res) => {
      res.render('profile.ejs', { user: req.user });
    }
  );

  return router;
};
