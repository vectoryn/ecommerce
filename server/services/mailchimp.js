const Mailchimp = require('mailchimp-api-v3');

const keys = require('../config/keys');

const { key, listKey } = keys.mailchimp;

class MailchimpService {
  init() {
    if (!key || !listKey) {
      return null;
    }

    try {
      return new Mailchimp(key);
    } catch (error) {
      console.warn('Mailchimp initialization failed');
    }
  }
}

const mailchimp = new MailchimpService().init();

exports.subscribeToNewsletter = async email => {
  try {
    if (!mailchimp) {
      return null;
    }

    return await mailchimp.post(`lists/${listKey}/members`, {
      email_address: email,
      status: 'subscribed'
    });
  } catch (error) {
    return error;
  }
};
