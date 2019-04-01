const parser = require('../../../lib/parsers/resource-timing');

describe('resource timing parser', () => {
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
});
