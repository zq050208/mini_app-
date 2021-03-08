/* eslint-disable local-rules/no-console */

export default {
  log(...msg: any[]) {
    console.log(...msg);
  },
  debug(...msg: any[]) {
    console.info(...msg);
  },
  error(...msg: any[]) {
    console.error(...msg);
  },
  warn(...msg: any[]) {
    console.warn(...msg);
  },
};
