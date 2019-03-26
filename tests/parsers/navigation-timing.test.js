const parser = require('../../lib/parsers/navigation-timing');

describe('navigation timing parsers', () => {
  it('does not set dns time when start property is not present', () => {
    expect(Object.keys(parser.parse({ })).includes('dns')).toBe(false);
  });

  it('calculates appCache time', () => {
    expect(parser.parse({
      nt_fet_st: '1553421507429',
      nt_dns_st: '1553421507430',
    }).appCache).toEqual({
      start: 1553421507429,
      end: 1553421507430,
      time: 1,
    });
  });

  it('calculates redirect time', () => {
    expect(parser.parse({
      nt_red_st: '1553427959982',
      nt_red_end: '1553427960022',
    }).redirect).toEqual({
      start: 1553427959982,
      end: 1553427960022,
      time: 40,
    });
  });

  it('calculates redirect count if present', () => {
    expect(parser.parse({
      nt_red_st: '1553427959982',
      nt_red_end: '1553427960022',
      nt_red_cnt: 3,
    }).redirect).toEqual({
      start: 1553427959982,
      end: 1553427960022,
      time: 40,
      count: 3,
    });
  });

  it('calculates dns time', () => {
    expect(parser.parse({
      nt_dns_st: '1553421507430',
      nt_dns_end: '1553421507457',
    }).dns).toEqual({
      start: 1553421507430,
      end: 1553421507457,
      time: 27,
    });
  });

  it('calculates connect time', () => {
    expect(parser.parse({
      nt_con_st: '1553421507457',
      nt_con_end: '1553421507525',
    }).connect).toEqual({
      start: 1553421507457,
      end: 1553421507525,
      time: 68,
    });
  });

  it('calculates request time', () => {
    expect(parser.parse({
      nt_req_st: '1553421507525',
      nt_res_st: '1553421507625',
    }).request).toEqual({
      start: 1553421507525,
      end: 1553421507625,
      time: 100,
    });
  });

  it('calculates response time', () => {
    expect(parser.parse({
      nt_res_st: '1553421507525',
      nt_res_end: '1553421507625',
    }).response).toEqual({
      start: 1553421507525,
      end: 1553421507625,
      time: 100,
    });
  });

  it('calculates time to dom complete', () => {
    expect(parser.parse({
      nt_domloading: '1553421507641',
      nt_domcomp: '1553421508500',
    }).domComplete).toEqual({
      start: 1553421507641,
      end: 1553421508500,
      time: 859,
    });
  });

  it('calculates time to on load', () => {
    expect(parser.parse({
      nt_load_st: '1553421508501',
      nt_load_end: '1553421508601',
    }).onLoad).toEqual({
      start: 1553421508501,
      end: 1553421508601,
      time: 100,
    });
  });

  it('sets protocol', () => {
    expect(parser.parse({
      nt_protocol: 'h2',
    }).protocol).toEqual('h2');
  });
});
