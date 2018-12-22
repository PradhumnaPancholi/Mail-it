const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/user');
require('./services/passport');
//DB connection string//
mongoose.connect(keys.mongoURI);

const app = express();

//code to enable cookies to handle auth//
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
 app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//auth routes//
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('feedback is running');
