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
});
