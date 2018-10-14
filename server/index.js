const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

//app config//
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'oauth/google/callback'
    },
      (accessToken, refreshToken, profile, done) => {
        console.log('Access Token:',accessToken);
        console.log('Refresh Token:',refreshToken);
        console.log('Profile:',profile);
      }
  )
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback',passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('feedback is running');
