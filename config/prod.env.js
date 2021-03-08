'use strict';

const packageConf = require('../package.json');

/**
 * 生产环境
 */

/**
 * !! 所有值都要单引号包双引号
 */

module.exports = {
  'process.env': {
    NODE_ENV: '"production"',
    VERSION: JSON.stringify(packageConf.version),
    GAS_BASE_URL: '"https://api.etc.gplqdb.com/gs"',
    APEX_H5_BASE_URL: '"https://apex.golcer.cn"',
    BI_BASE_URL: "'https://bigdata2.etc.gplqdb.com/gas-log'",
  },
};
