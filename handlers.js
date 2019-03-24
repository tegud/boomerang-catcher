const querystring = require('querystring');

const getResponseHeaders = () => {
  if (!process.env.corsAllowOrigin) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': process.env.corsAllowOrigin,
  };
};

const parseBodyParameters = body => body ? Object.entries(querystring.parse(body)) : [];

const buildParameters = ({ queryStringParameters, body }) => [
  ...queryStringParameters && queryStringParameters.length ? Object.entries(queryStringParameters) : [],
  ...parseBodyParameters(body),
].reduce((all, [key, value]) => {
  all[key] = value;

  return all;
}, {});

module.exports.beacon = async (event) => {
  console.log(buildParameters(event));

  return {
    statusCode: 204,
    headers: getResponseHeaders(),
  };
};
