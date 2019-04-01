const calculateTimings = (property, start, end) => {
  if (typeof start === 'undefined' || typeof end === 'undefined') {
    return {};
  }

  const timingObject = {};

  timingObject[property] = {
    start,
    end,
    duration: end - start,
  };

  return timingObject;
};

const getOptionalTimings = (startTime, responseEnd, [
  responseStart,
  requestStart,
  connectEnd, ,
  connectStart,
  domainLookupEnd,
  domainLookupStart,
  redirectEnd,
  redirectStart,
]) => ({
  ...calculateTimings('response', responseStart, responseEnd),
  ...calculateTimings('request', requestStart, responseStart),
  ...calculateTimings('connect', connectStart, connectEnd),
  ...calculateTimings('dns', domainLookupStart, domainLookupEnd),
  ...calculateTimings('redirect', redirectStart, redirectEnd),
});

module.exports = {
  getTimingData: (timings) => {
    const [
      startTime,
      responseEnd,
      ...otherTimings
    ] = timings.split(',').map(timing => parseInt(timing, 36));

    return {
      startTime,
      endTime: startTime + responseEnd,
      duration: responseEnd,
      ...getOptionalTimings(startTime, responseEnd, otherTimings),
    };
  },
};
