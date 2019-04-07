const axios = require('axios');

module.exports = {
  sendToWebhook: data => {
    console.log(process.env.webhook);
    console.log(data);

    return axios.post(process.env.webhook, data);
  },
};
