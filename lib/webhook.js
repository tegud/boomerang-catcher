const axios = require('axios');

module.exports = {
  sendToWebhook: (data) => axios.post(process.env.webhook, data),
};
