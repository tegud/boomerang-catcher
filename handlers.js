const getResponseHeaders = () => {
  if (!process.env.corsAllowOrigin) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': process.env.corsAllowOrigin,
  };
};

const buildParameters = ({ queryStringParameters, body }) => [
  ...queryStringParameters && queryStringParameters.length ? Object.entries(queryStringParameters) : [],
  ...body ? Object.entries(JSON.parse(body)) : [],
].reduce((all, [key, value]) => {
  all[key] = value;

  return all;
}, {});

module.exports.beacon = async (event) => {
  console.log(event.body)
  // console.log(buildParameters(event));

  return {
    statusCode: 204,
    headers: getResponseHeaders(),
  };
};
