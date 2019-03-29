const buildFullPath = (properties, path = '') => Object.entries(properties)
  .reduce((all, [key, value]) => {
    const newPath = `${path}${key}`;
    if (typeof value !== 'object' || value.forEach) {
      all[newPath] = value;
      return all;
    }

    return {
      ...all,
      ...buildFullPath(value, newPath),
    };
  }, {});

module.exports = {
  trieToHash: trie => buildFullPath(trie),
};
