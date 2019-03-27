const parser = require('../../lib/parsers/url');

describe('url parser', () => {
  describe('for valid url', () => {
    it('sets host', () => {
      expect(parser.parse({
        u: 'https://www.example.com/',
      }).host).toEqual('www.example.com');
    });

    it('sets path', () => {
      expect(parser.parse({
        u: 'https://www.example.com/page/one/',
      }).path).toEqual('/page/one/');
    });

    it('sets querystring', () => {
      expect(parser.parse({
        u: 'https://www.example.com/page/one/?x=1&y=2',
      }).querystring).toEqual('?x=1&y=2');
    });

    it('sets hash', () => {
      expect(parser.parse({
        u: 'https://www.example.com/page/one/#hash',
      }).hash).toEqual('#hash');
    });
  });

  describe('for invalid url', () => {
    it('returns empty object', () => {
        expect(parser.parse({
          u: 'not-a-url',
        })).toEqual({});
    });
  });
});
