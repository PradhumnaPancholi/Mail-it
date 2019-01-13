const Survey = require('../models/Survey');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const mongoose = require('mongoose');

module.exports = app =>{
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

    //taking data from body//
    const{ title,subject,body,recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),//this piece of code takes the strings entered(client side), seprate thm from ",". then ".map" takes each string and turn it into object with field name of "email" and passes the string as value//
      _user: req.user.id,
      dateCreated: Date.now()
    });

    //to creat a new mailer object//
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  });
};
