const querystring = require('querystring');
const navigationTimingParser = require('./lib/parsers/navigation-timing');
const roundTripParser = require('./lib/parsers/round-trip');
const urlParser = require('./lib/parsers/url');
const { sendToWebhook } = require('./lib/webhook');

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
  const userAgent = event.headers['User-Agent'];
  console.log(parameters);

  const boomerangEvent = {
    type: process.env.BOOMERANGCATCHER_EVENT_TYPE || 'boomerang',
    userAgent,
    navigation: navigationTimingParser.parse(parameters),
    url: urlParser.parse(parameters),
    ...roundTripParser.parse(parameters),
  };

  console.log(boomerangEvent);
  await sendToWebhook([boomerangEvent]);

  // if (parameters.restiming) {
  //   console.log(JSON.stringify(trieToHash(JSON.parse(parameters.restiming)), null, 4));
  // }

  return {
    statusCode: 204,
    headers: getResponseHeaders(),
  };
};
