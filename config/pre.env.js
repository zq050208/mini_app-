'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

/**
 * 预发环境
 */

module.exports = merge(prodEnv, {
  'process.env': {
    NODE_ENV: '"pre"',
    GAS_BASE_URL: '"https://staging.api.etc.gplqdb.com/gs"',
    APEX_H5_BASE_URL: '"https://apex-pre.golcer.cn"',
    BI_BASE_URL: "'https://testbd.golcer.cn/gas-log'",
  }
})
