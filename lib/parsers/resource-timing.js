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
    const entries = Object.entries(parsedRestiming);

    return {
      resources: entries.map(([, detail]) => ({
        type: initiators[detail[0]],
        initiatorType: detail[0],
      })),
    };
  },
};
