const { getSpecialData } = require('../../../lib/parsers/resource-timing/special-data');

describe('resource timing special data', () => {
  it('sets size', () => expect(getSpecialData(['1c']).size)
    .toEqual(12));

  it('sets scriptAsync', () => expect(getSpecialData(['21']).scriptAsync)
    .toEqual(true));

  it('sets scriptDefer', () => expect(getSpecialData(['23']).scriptDefer)
    .toEqual(true));

  it('sets scriptBody', () => expect(getSpecialData(['24']).scriptBody)
    .toEqual(true));
});
