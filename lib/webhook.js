const axios = require('axios');

module.exports = {
  sendToWebhook: async data => {
    console.log(process.env.webhook);
    console.log(data);


    try {
      const response = await axios({
        url: process.env.webhook,
        data,
        transformRequest: (data) => data
          .map(item => JSON.stringify(item))
          .join('\n'),
      });
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);

        return;
      }
    }

    console.log(response.body);
  },
};
