const requireLogin = require('../middlewares/requireLogin');
const requireCredit = require('../middlewares/requireCredit');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplate/surveyTemplate');

const mongoose = require('mongoose');
const Survey = require('../models/Survey');

module.exports = app =>{
  app.post('/api/survey', requireLogin, requireCredits, (req, res) => {

    //taking data from body//
    const{ title,subject,body,recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email }),//this piece of code takes the strings entered(client side), seprate thm from ",". then ".map" takes each string and turn it into object with field name of "email" and passes the string as value//
      _user: req.user.id,
      dateCreated: Date.now()
    });

    //to creata a new mailer object//
    const mailer = new Mailer(survey, surveyTemplate(survey));
  });
};
