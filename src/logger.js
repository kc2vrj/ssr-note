const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console()
  ],
});

// Add File transport only in server environment
if (typeof window === 'undefined') {
  logger.add(new transports.File({ filename: './app.log' }));
}

module.exports = logger;
