const { trieToHash } = require('../lib/trie');

describe('trie to hash', () => {
  it('converts single, one level deep trie entry to hash', () => expect(trieToHash({
    a: '12345',
  })).toEqual({ a: '12345' }));

  it('converts single, two level deep trie entry to hash', () => expect(trieToHash({
    a: {
      b: '123',
      c: '456',
    },
  })).toEqual({
    ab: '123',
    ac: '456'
  }));

  it('converts two, three level deep trie entry to hash', () => expect(trieToHash({
    a: {
      b: '123',
      c: { d: '456' },
    },
    e: {
      f: { g: '789' }
    },
  })).toEqual({
    ab: '123',
    acd: '456',
    efg: '789',
  }));

  it('converts single, one level deep trie with array value entry to hash', () => expect(trieToHash({
    a: ['123', '456'],
  })).toEqual({ a: ['123', '456'] }));
});
