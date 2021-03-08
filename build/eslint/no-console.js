var noConsole = require('eslint/lib/rules/no-console');

noConsole.meta.messages = {
  unexpected:
    'console 的方法在打生产包时会被全部去除。如需日志需要记录或处理请用`logger`',
};

module.exports = noConsole;
