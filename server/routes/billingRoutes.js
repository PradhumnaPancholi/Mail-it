const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe',requireLogin, async (req, res) =>{
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: '$5 for 50 email credits'
    });
    //adding credits to user//
    req.user.credits += 50;
    //saving data
    const user = await req.user.save();
    res.send(user);
  });
};
