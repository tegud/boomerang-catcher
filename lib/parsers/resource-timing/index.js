const { trieToHash } = require('../../trie');
const { getSpecialData } = require('./special-data');
const { getTimingData } = require('./timing');

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

module.exports = {
  parse: ({ restiming }) => {
    const parsedRestiming = JSON.parse(restiming);
    const entries = Object.entries(trieToHash(parsedRestiming));

    return {
      resources: entries.map(([resourceUrl, [initiatorType, ...data]]) => {
        const [timings, ...specialData] = data.join('').split('*');
        const type = initiators[initiatorType];

        return {
          resourceUrl,
          type,
          initiatorType,
          ...getTimingData(timings),
          ...getSpecialData(specialData),
        };
      }),
    };
  },
};
