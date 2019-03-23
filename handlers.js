const getResponseHeaders = () => {
  if (!process.env.corsAllowOrigin) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': process.env.corsAllowOrigin,
  };
};

module.exports.beacon = async (event) => {
  const parameters = Object.entries(event.queryStringParameters);

  console.log(parameters);

  return {
    statusCode: 200,
    headers: getResponseHeaders(),
  };
};
