const { trieToHash } = require('../trie');

const initiators = {
  0: 'other',
  1: 'image',
  2: 'link',
  3: 'script',
  4: 'css',
  5: 'xmlhttprequest',
  6: 'html',
  7: 'image',
  8: 'beacon',
  9: 'fetch',
  a: 'image',
};

const specialDataIdentifiers = {
  1: 'size',
  2: 'script',
  3: 'servertiming',
  4: 'linkAttr',
  5: 'dataNamespaced',
};

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

const getSpecialData = (specialData = []) => specialData.reduce((all, item) => {
  const specialDataType = specialDataIdentifiers[item[0]];
  const specialDataValue = item.substring(1);

  if (specialDataType === 'size') {
    all[specialDataType] = parseInt(specialDataValue, 36);
  } else if (specialDataType === 'script') {
    const data = parseInt(specialDataValue, 10);
    const scriptAttributes = {
      scriptAsync: 0x1,
      scriptDefer: 0x2,
      scriptBody: 0x4,
    };

    const matchScriptAttribute = (
      value,
      attribute,
    ) => (value & scriptAttributes[attribute]) // eslint-disable-line no-bitwise
        === scriptAttributes[attribute];

    all.scriptAsync = matchScriptAttribute(data, 'scriptAsync');
    all.scriptDefer = matchScriptAttribute(data, 'scriptDefer');
    all.scriptBody = matchScriptAttribute(data, 'scriptBody');
  }

  return all;
}, {});

module.exports = {
  parse: ({ restiming }) => {
    const parsedRestiming = JSON.parse(restiming);
    const entries = Object.entries(trieToHash(parsedRestiming));

    return {
      resources: entries.map(([resourceUrl, str]) => {
        const [initiatorType, ...data] = str;

        const [timings, ...specialData] = data.join('').split('*');

        const [
          startTime,
          responseEnd,
          ...otherTimings
        ] = timings.split(',').map(timing => parseInt(timing, 36));
        const type = initiators[initiatorType];

        return {
          resourceUrl,
          type,
          initiatorType,
          startTime,
          endTime: startTime + responseEnd,
          duration: responseEnd,
          ...getOptionalTimings(startTime, responseEnd, otherTimings),
          ...getSpecialData(specialData),
        };
      }),
    };
  },
};
