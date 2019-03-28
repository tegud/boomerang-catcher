const URL = require('url');
const isUrl = require('is-url');

module.exports = {
  parse: ({ u }) => {
    if (!isUrl(u)) {
      return {};
    }

    const {
      host,
      pathname,
      search,
      hash,
    } = new URL(u);

    return {
      host,
      path: pathname,
      querystring: search,
      hash,
    };
  },
};
