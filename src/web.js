(async () => {
  require('dotenv').config({ silent: true });

  const db = await require('mongodb').MongoClient.connect(process.env.MONGOLAB_URI);

  const connectEnsureLogin = require('connect-ensure-login');
  const ensureLoggedIn = connectEnsureLogin.ensureLoggedIn();
  const ensureLoggedOut = connectEnsureLogin.ensureLoggedOut();

  const app = require('express')();

  app.use(await require('./routers/authenticate')({ db, ensureLoggedOut }));
  app.use(await require('./routers/home')());
  app.use(await require('./routers/profile')({ db, ensureLoggedIn }));

  app.listen(process.env.PORT);
})();
