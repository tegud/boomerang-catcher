const calculateDuration = (startProperty, endProperty, parameters) => {
  if (!parameters[startProperty] || !parameters[endProperty]) {
    return undefined;
  }

  const start = parseInt(parameters[startProperty], 10);
  const end = parseInt(parameters[endProperty], 10);

  return {
    start,
    end,
    time: end - start,
  };
};

module.exports = { calculateDuration };
