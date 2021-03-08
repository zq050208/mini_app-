'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

/**
 * 开发环境
 */

module.exports = merge(prodEnv, {
  'process.env': {
    NODE_ENV: '"development"',
    GAS_BASE_URL: '"https://api-dev.golcer.cn/gs"',
    APEX_H5_BASE_URL: '"https://apex-dev.golcer.cn"',
    BI_BASE_URL: "'https://testbd.golcer.cn/gas-log'",
  },
});
