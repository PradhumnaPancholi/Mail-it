const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
  constructor({subject, recipients}, content){
    super();

    this.sgAPI = sendgrid(keys.sendGridKey)
    this.from_email = new helper.Email('no-reply@mailit.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
    }

    formatAddresses(recipients){
      return  recipients.map(({ email }) => {
        return new helper.Email(email)
      })
    }

    addClickTracking(){
      const trackingSettings = new helper.TrackingSettings();
      const clickTracking = new helper.ClickTracking(true, true);

      trackingSettings.setCliclTracking(clickTracking);
      this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
      const personalize = new helper.Personalization();

      this.recipients.forEach(recipient => {
        personalize.addTo(recipient);
      })
      this.addPersonalization(personalize);
    }

    //to send request to sendgrid//
    async send() {
      const request = this.sgAPI.emptyRequest({
        method = 'POST',
        path = 'v3/mail/send/'
        body = this.JSON()
      });

      this.sgAPI.API(reqest);
      return response;
    }
}

module.exports = Mailer;
