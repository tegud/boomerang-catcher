const calculateDuration = (startProperty, endProperty, parameters) => {
  if (!parameters[startProperty] || !parameters[endProperty]) {
    return undefined;
  }

  const start = parseInt(parameters[startProperty], 10);
  const end = parseInt(parameters[endProperty], 10);

  return {
    start,
    end,
    time: end - start,
  };
};

const calculations = {
  appCache: { duration: ['nt_fet_st', 'nt_dns_st'] },
  redirect: {
    duration: ['nt_red_st', 'nt_red_end'],
    mapValues: {
      count: {
        field: 'nt_red_cnt',
        type: 'int',
      },
    },
  },
  dns: { duration: ['nt_dns_st', 'nt_dns_end'] },
  connect: { duration: ['nt_con_st', 'nt_con_end'] },
  request: { duration: ['nt_req_st', 'nt_res_st'] },
  response: { duration: ['nt_res_st', 'nt_res_end'] },
  timeToFirstByte: { duration: ['nt_nav_st', 'nt_res_end'] },
  domComplete: { duration: ['nt_domloading', 'nt_domcomp'] },
  onLoad: { duration: ['nt_load_st', 'nt_load_end'] },
  protocol: {
    mapValues: {
      protocol: {
        field: 'nt_protocol',
        type: 'string',
      },
    },
  },
};

module.exports = {
  parse: parameters => Object.entries(calculations).reduce((all, [key, mappings]) => {
    const values = Object.entries(mappings).reduce((allValues, [mappingKey, config]) => {
      if (mappingKey === 'duration') {
        const [start, end] = config;
        return {
          ...allValues,
          ...calculateDuration(start, end, parameters),
        };
      }

      if (mappingKey === 'mapValues') {
        const valuesToMap = Object.entries(config);

        return valuesToMap.reduce((result, [property, { field, type }]) => {
          if (typeof parameters[field] !== 'undefined') {
            if (type === 'int') {
              result[property] = parseInt(parameters[field], 10);
            } else {
              result[property] = parameters[field];
            }
          }

          return result;
        }, allValues);
      }

      return allValues;
    }, {});

    if (Object.keys(values).length === 1) {
      all[key] = values[Object.keys(values)[0]];
    } else if (Object.keys(values).length) {
      all[key] = values;
    }

    return all;
  }, {}),
};
