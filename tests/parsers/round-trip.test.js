const parser = require('../../lib/parsers/round-trip');

describe('round trip parsers', () => {
  it('sets timeToFirstByte', () => {
    expect(parser.parse({
      t_resp: '545',
    }).responseTimes.timeToFirstByte).toEqual(545);
  });

  it('sets done', () => {
    expect(parser.parse({
      t_done: '1072',
    }).responseTimes.done).toEqual(1072);
  });

  it('sets onLoad', () => {
    expect(parser.parse({
      t_page: '872',
    }).responseTimes.onLoad).toEqual(872);
  });

  it('sets other properties', () => {
    expect(parser.parse({
      t_other: 't_domloaded|625,boomerang|8,boomr_fb|524',
    }).responseTimes).toEqual({
      domloaded: 625,
      boomerang: 8,
      boomr_fb: 524
    });
  });

  it('sets start source', () => {
    expect(parser.parse({
      'rt.start': 'navigation',
    }).responseTimes.startSource).toEqual('navigation');
  });

  it('sets nextUrl to be nu value', () => {
    expect(parser.parse({
      'nu': 'https://example.com',
    }).responseTimes.nextUrl).toEqual('https://example.com');
  });
});
