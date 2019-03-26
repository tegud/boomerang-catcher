const { mapDataset } = require('../dataset-mapper');

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
  domComplete: { duration: ['nt_domloading', 'nt_domcomp'] },
  onLoad: { duration: ['nt_load_st', 'nt_load_end'] },
  protocol: 'nt_protocol',
};

module.exports = {
  parse: parameters => mapDataset(calculations, parameters),
};
