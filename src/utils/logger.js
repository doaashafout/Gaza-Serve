const log = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta,
  };

  const logMethods = {
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
  };

  const logFn = logMethods[level] || console.log;
  logFn(JSON.stringify(logEntry));
};

const logger = {
  info: (message, meta) => log('info', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  error: (message, meta) => log('error', message, meta),
  debug: (message, meta) => log('debug', message, meta),
};

module.exports = logger;
