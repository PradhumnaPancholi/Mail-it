const passport = require('passport');

module.exports = app => {
  //route to "sign in with ggogle"//
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  //callback after authentication//
  app.get('/auth/google/callback',passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );
  //logout//
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/currentuser', (req,res) => {
    res.send(req.user);
  });
};
