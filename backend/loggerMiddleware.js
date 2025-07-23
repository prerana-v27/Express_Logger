const fs = require('fs');
const path = require('path');

// Logger middleware factory with configuration options
function createLoggerMiddleware(options = {}) {
  const logFilePath = options.logFilePath || path.join(__dirname, 'request.log');
  const errorLogPath = options.errorLogPath || path.join(__dirname, 'errors.log');
  const format = options.format || 'json';

  return (req, res, next) => {
    const logEntry = {
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
    };

    // Format log entry
    const logLine = format === 'json'
      ? JSON.stringify(logEntry) + '\n'
      : `[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url}\n`;

    // Always log to console (for Render, Vercel, etc.)
    console.log(logLine.trim());

    // Log to file only in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      fs.appendFile(logFilePath, logLine, (err) => {
        if (err) {
          console.error('Failed to write to log file:', err.message);

          const errorEntry = `[${new Date().toISOString()}] Failed to write to ${logFilePath}: ${err.message}\n`;

          // Attempt to write to error log
          fs.appendFile(errorLogPath, errorEntry, (errorWritingErrorLog) => {
            if (errorWritingErrorLog) {
              console.error('Also failed to write to error log:', errorWritingErrorLog.message);
            }
          });
        }
      });
    }

    next();
  };
}

// Export both
module.exports = createLoggerMiddleware({});
module.exports.createLoggerMiddleware = createLoggerMiddleware;
