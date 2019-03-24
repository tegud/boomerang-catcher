const { mapDataset } = require('../dataset-mapper');

const calculations = {
  responseTimes: {
    mapValues: {
      timeToFirstByte: {
        field: 't_resp',
        type: 'int',
      },
      done: {
        field: 't_done',
        type: 'int',
      },
      onLoad: {
        field: 't_page',
        type: 'int',
      },
      startSource: {
        field: 't_start',
        type: 'string',
      },
    },
    map: (parameters) => {
      if (!parameters.t_other) {
        return {};
      }

      const values = parameters.t_other.split(',');

      return values.reduce((all, kvp) => {
        const [key, value] = kvp.split('|');

        all[key.replace('t_', '')] = parseInt(value, 10);
        return all;
      }, {});
    },
  },
};

module.exports = {
  parse: parameters => mapDataset(calculations, parameters),
};
