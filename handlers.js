const querystring = require('querystring');
const navigationTimingParser = require('./lib/parsers/navigation-timing');
const roundTripParser = require('./lib/parsers/round-trip');
const urlParser = require('./lib/parsers/url');

const { trieToHash } = require('./lib/trie');

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

  console.log({
    navigation: navigationTimingParser.parse(parameters),
    url: urlParser.parse(parameters),
    ...roundTripParser.parse(parameters),
  });

  if (parameters.restiming) {
    console.log(JSON.stringify(trieToHash(JSON.parse(parameters.restiming)), null, 4));
  }

  return {
    statusCode: 204,
    headers: getResponseHeaders(),
  };
};
