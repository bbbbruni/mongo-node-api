const config = require('../config');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.sendgridKey);

exports.send = (to, subject, body) => {
  sgMail.send({
    to,
    from: 'brunoauthuser@gmail.com',
    subject,
    html: body,
  })
}