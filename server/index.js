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

//for production//
if(process.env.NODE_ENV === 'production')
{
  //to provide production assests if path doen't match ant of node routes//
  app.use(express.static('client/build'));
  //if match not found in 'client/build', send index.html as response//
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log('feedback is running');
