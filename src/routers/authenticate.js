module.exports = async ({ db, ensureLoggedOut }) => {
  const users = db.collection('users');
  await users.createIndex({ username: 1 });

  const passport = require('passport');

  passport.deserializeUser(
    async (_id, cb) => {
      cb(null, await users.findOne({ _id }));
    }
  );

  passport.serializeUser(
    async (user, cb) => {
      cb(null, user._id);
    }
  );

  passport.use(new (require('passport-local').Strategy)(
    async (username, password, cb) => {
      const user = await users.findOne({ username });
      if (user && user.password === password) {
        cb(null, user);
      } else {
        cb(null, null);
      }
    })
  );

  const router = require('express').Router();

  router.use(require('body-parser').urlencoded({ extended: true }));
  router.use(require('cookie-parser')());
  router.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'secret' }));
  router.use(passport.initialize());
  router.use(passport.session());

  router.route('/login')
    .get(
      ensureLoggedOut,
      (req, res) => {
        res.render('login.ejs');
      })
    .post(
      passport.authenticate('local', { failureRedirect: '/login', successReturnToOrRedirect: '/' })
    );

  router.get('/logout',
    (req, res) => {
      if (req.user) {
        req.logout();
      }
      res.redirect('/');
    }
  );

  return router;
};
