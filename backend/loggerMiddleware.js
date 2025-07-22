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

    // Choose format
    let logLine;
    if (format === 'json') {
      logLine = JSON.stringify(logEntry) + '\n';
    } else {
      logLine = `[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url}\n`;
    }

    fs.appendFile(logFilePath, logLine, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);

        const errorEntry = `[${new Date().toISOString()}] Failed to write to ${logFilePath}: ${err.message}\n`;
        fs.appendFile(errorLogPath, errorEntry, (errorWritingErrorLog) => {
          if (errorWritingErrorLog) {
            console.error('Also failed to write to error log:', errorWritingErrorLog);
          }
        });
      }
    });

    next();
  };
}

// Export both
module.exports = createLoggerMiddleware({}); // default export
module.exports.createLoggerMiddleware = createLoggerMiddleware;
