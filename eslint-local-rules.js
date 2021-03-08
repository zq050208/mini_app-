'use strict';

var noConsole = require('./build/eslint/no-console');
var noWX = require('./build/eslint/no-wx');
var noNavigation = require('./build/eslint/no-navigation');

module.exports = {
  'no-console': noConsole,
  'no-wx': noWX,
  'no-navigation': noNavigation
};
