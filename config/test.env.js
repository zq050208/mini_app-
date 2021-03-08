'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

/**
 * 测试环境
 */

module.exports = merge(prodEnv, {
  'process.env': {
    NODE_ENV: '"test"',
    GAS_BASE_URL: '"https://api-test.golcer.cn/gs"',
    APEX_H5_BASE_URL: '"https://apex-test.golcer.cn"',
    BI_BASE_URL: "'https://testbd.golcer.cn/gas-log'",
  },
});
