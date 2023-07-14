/* eslint-disable no-console */

const LOGGING_ENABLED = true;

const error = (...rest: unknown[]) => LOGGING_ENABLED && console.error(...rest);

const warn = (...rest: unknown[]) => LOGGING_ENABLED && console.warn(...rest);

const info = (...rest: unknown[]) => LOGGING_ENABLED && console.info(...rest);

const log = (...rest: unknown[]) => LOGGING_ENABLED && console.log(...rest);

const debug = (...rest: unknown[]) => LOGGING_ENABLED && console.debug(...rest);

export const Logger = {
  error,
  warn,
  info,
  log,
  debug,
};
