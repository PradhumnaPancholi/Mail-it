const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');


//function to serialize user//
passport.serializeUser((user, done) => {
  done(null ,user.id);
});

//function to deserialize user//
passport.deserializeUser((id, done) =>{
  User.findById(id).then(user => {
    done(null, user);
  })
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
      async (accessToken, refreshToken, profile, done) => {
          const existingUser = await User.findOne({googleID : profile.id})
            if(existingUser){
              //we already have the user //
              done(null, existingUser);
            }
            else{
              //add new user//
              const user = await new User({googleID : profile.id, userName : profile.displayName }).save()
              done(null, user);
            }
     }
  )
);
