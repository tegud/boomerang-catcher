const { calculateDuration } = require('./calculate-duration');

const mappingFunctions = {
  duration: ([start, end], parameters) => calculateDuration(
    start,
    end,
    parameters,
  ),
  mapValues: (config, parameters) => {
    const valuesToMap = Object.entries(config);

    return valuesToMap.reduce((result, [property, { field, type }]) => {
      if (typeof parameters[field] !== 'undefined' && parameters[field] !== null) {
        if (type === 'int') {
          result[property] = parseInt(parameters[field], 10);
        } else {
          result[property] = parameters[field];
        }
      }

      return result;
    }, {});
  },
  map: (fn, parameters) => fn(parameters),
};

const mapValue = ([mappingKey, config], parameters) => {
  if (mappingFunctions[mappingKey]) {
    return mappingFunctions[mappingKey](config, parameters);
  }

  return {};
};

const mapDataset = (mappingConfig, parameters) => Object.entries(mappingConfig)
  .reduce((all, [key, mappings]) => {
    if (typeof mappings === 'object') {
      const values = Object.entries(mappings).reduce((allValues, mapping) => ({
        ...allValues,
        ...mapValue(mapping, parameters),
      }), {});

      if (Object.keys(values).length) {
        all[key] = values;
      }
    } else if (typeof mappings === 'string') {
      all[key] = parameters[mappings];
    }

    return all;
  }, {});

module.exports = { mapDataset };
