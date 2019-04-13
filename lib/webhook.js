const axios = require('axios');

module.exports = {
  sendToWebhook: async data => {
    try {
      const response = await axios({
        url: process.env.webhook,
        method: 'POST',
        data,
        transformRequest: data => data
          .map(item => JSON.stringify(item))
          .join('\n'),
      });
    } catch (e) {
      if (e.response) {
        console.log(`Error from webhook target (http status: ${e.response.status}) `);
        console.log(e.response.data);
        return;
      }

      console.log(`Error calling webhook: ${e.message}`);
    }
  },
};
