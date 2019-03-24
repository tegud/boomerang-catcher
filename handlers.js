const querystring = require('querystring');
const navigationTimingParser = require('./lib/parsers/navigation-timing');

const getResponseHeaders = () => {
  if (!process.env.corsAllowOrigin) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': process.env.corsAllowOrigin,
  };
};

const parseBodyParameters = body => (body ? Object.entries(querystring.parse(body)) : []);

const buildParameters = ({ queryStringParameters, body }) => [
  ...queryStringParameters && queryStringParameters.length
    ? Object.entries(queryStringParameters)
    : [],
  ...parseBodyParameters(body),
].reduce((all, [key, value]) => {
  all[key] = value;

  return all;
}, {});

module.exports.beacon = async (event) => {
  const parameters = buildParameters(event);
  console.log(parameters);
  console.log(navigationTimingParser.parse(parameters));

  return {
    statusCode: 204,
    headers: getResponseHeaders(),
  };
};
