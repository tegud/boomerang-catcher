const axios = require('axios');

module.exports = {
  sendToWebhook: async data => {
    console.log(process.env.webhook);
    console.log(data);

    const response = await axios.post(process.env.webhook, data);

    console.log(response.body);
  },
};
