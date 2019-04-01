const parser = require('../../lib/parsers/resource-timing');

describe('resource timing parser', () => {
  describe('type is set from initiator type enum', () => {
    [
      { enumValue: '0', expected: 'other' },
      { enumValue: '1', expected: 'image' },
      { enumValue: '2', expected: 'link' },
      { enumValue: '3', expected: 'script' },
      { enumValue: '4', expected: 'css' },
      { enumValue: '5', expected: 'xmlhttprequest' },
      { enumValue: '6', expected: 'html' },
      { enumValue: '7', expected: 'image' },
      { enumValue: '8', expected: 'beacon' },
      { enumValue: '9', expected: 'fetch' },
      { enumValue: 'a', expected: 'image' },
    ].forEach(({ enumValue, expected }) => it('sets image', () => expect(parser.parse({
      restiming: JSON.stringify({
        'https://example.com/resource': enumValue,
      }),
    }).resources[0].type).toBe(expected)))
  });

  it('sets initiatorType', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0',
    }),
  }).resources[0].initiatorType).toBe('0'));

  it('sets resourceUrl', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0',
    }),
  }).resources[0].resourceUrl).toBe('https://example.com/resource'));

  it('sets startTime', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c',
    }),
  }).resources[0].startTime).toBe(12));

  it('sets endTime', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,3',
    }),
  }).resources[0].endTime).toBe(15));

  it('sets duration', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,3',
    }),
  }).resources[0].duration).toBe(3));

  it('sets response', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,3,2',
    }),
  }).resources[0].response).toEqual({ start: 2, end: 3, duration: 1 }));

  it('sets request', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,3,9,2',
    }),
  }).resources[0].request).toEqual({ start: 2, end: 9, duration: 7 }));

  it('sets connect', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,1,1,1,7,5,2',
    }),
  }).resources[0].connect).toEqual({ start: 2, end: 7, duration: 5 }));

  it('sets dns', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,1,1,1,1,1,1,c,2',
    }),
  }).resources[0].dns).toEqual({ start: 2, end: 12, duration: 10 }));

  it('sets redirect', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,1,1,1,1,1,1,1,1,b,3',
    }),
  }).resources[0].redirect).toEqual({ start: 3, end: 11, duration: 8 }));

  it('sets size', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,1,1*1c',
    }),
  }).resources[0].size).toEqual(12));

  it('sets scriptAsync', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,1,1*21',
    }),
  }).resources[0].scriptAsync).toEqual(true));

  it('sets scriptDefer', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,1,1*23',
    }),
  }).resources[0].scriptDefer).toEqual(true));

  it('sets scriptBody', () => expect(parser.parse({
    restiming: JSON.stringify({
      'https://example.com/resource': '0c,1,1*24',
    }),
  }).resources[0].scriptBody).toEqual(true));

  it.skip('handles nested trie structures', () => expect(parser.parse({
    restiming: `{
      "https://": {
        "www.": {
          "example.com/": {
            "1": {
              "2-f172d02693c747cf574d.js":"22v,z,w,d*1eij,-eh7,101l*25*42",
              "-affc6a03db3ae3364506.js":"22w,13,w,c*1pfq,-pee,1d4y*25*42"
            }
          },
          "fonts.g": {
            "oogleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400":"22x,d,b,8*1mf,_,94x*44",
            "static.com/s/": {
              "merriweather/v20/u-4": {
                "l0qyriQwlOrhSvowK_l5-eR7lXff4jvzDP3WG.woff2":"49z*19u4,_",
                "n0qyriQwlOrhSvowK_l52": {
                  "1wRZWMf6hPvhPQ.woff2":"4a0*199c,_","xwNZWMf6hPvhPQ.woff2":"4a0*19eo,_"
                }
              },
              "opensans/v16/mem": {
                "5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2":"4a1*1708,_",
                "8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2":"4a1*171o,_"
              }
            }
          }
        }
      }
    }`,
  }).resources).toEqual([
    {
      "duration": 35,
      "endTime": 138,
      "initiatorType": "2",
      "resourceUrl": "https://www.example.com/12-f172d02693c747cf574d.js",
      "request": {"duration": 19, "end": 32, "start": 13},
      "response": {"duration": 3, "end": 35, "start": 32},
      "startTime": 103,
      "type": "link",
    },
    {
      "duration": 39,
      "endTime": 143,
      "initiatorType": "2",
      "request": {"duration": 20, "end": 32, "start": 12},
      "resourceUrl": "https://www.example.com/1-affc6a03db3ae3364506.js",
      "response": {"duration": 7, "end": 39, "start": 32},
      "startTime": 104,
      "type": "link",
    },
    {
      "duration": 13,
      "endTime": 118,
      "initiatorType": "2",
      "request": { "duration": 3, "end": 11, "start": 8 },
      "resourceUrl": "https://www.fonts.googleapis.com/css?family=Merriweather:300,700,700italic,300italic|Open+Sans:700,400",
      "response": {"duration": 2, "end": 13, "start": 11},
      "startTime": 105,
      "type": "link"
    },
    {
      "duration": NaN,
      "endTime": NaN,
      "initiatorType": "4",
      "resourceUrl": "https://www.fonts.gstatic.com/s/merriweather/v20/u-4l0qyriQwlOrhSvowK_l5-eR7lXff4jvzDP3WG.woff2",
      "startTime": 359,
      "type": "css"
    },
    {
      "duration": NaN,
      "endTime": NaN,
      "initiatorType": "4",
      "resourceUrl": "https://www.fonts.gstatic.com/s/merriweather/v20/u-4n0qyriQwlOrhSvowK_l52xwNZWMf6hPvhPQ.woff2",
      "startTime": 360,
      "type": "css"
    },
    {
      "duration": NaN,
      "endTime": NaN,
      "initiatorType": "4",
      "resourceUrl": "https://www.fonts.gstatic.com/s/opensans/v16/mem5YaGs126MiZpBA-UN7rgOUuhpKKSTjw.woff2",
      "startTime": 361,
      "type": "css"
    },
    {
      "duration": NaN,
      "endTime": NaN,
      "initiatorType": "4",
      "resourceUrl": "https://www.fonts.gstatic.com/s/opensans/v16/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2",
      "startTime": 361,
      "type": "css"
    },
  ]))
});
