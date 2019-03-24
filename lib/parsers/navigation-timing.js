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
  appCache: ['nt_fet_st', 'nt_dns_st'],
  dns: ['nt_dns_st', 'nt_dns_end'],
  connect: ['nt_con_st', 'nt_con_end'],
  request: ['nt_req_st', 'nt_res_st'],
  response: ['nt_res_st', 'nt_res_end'],
  timeToFirstByte: ['nt_nav_st', 'nt_res_end'],
  domComplete: ['nt_domloading', 'nt_domcomp'],
  onLoad: ['nt_load_st', 'nt_load_end'],
};

module.exports = {
  parse: parameters => Object.entries(calculations).reduce((all, [key, [start, end]]) => {
    const calculatedValue = calculateDuration(start, end, parameters);

    if (calculatedValue) {
      all[key] = calculatedValue;
    }

    return all;
  }, {}),
};
