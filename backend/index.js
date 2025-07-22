const express = require('express');
const cors = require('cors');
const { createLoggerMiddleware } = require('./loggerMiddleware'); // Import factory

const app = express();
const port = 5000;

// Create custom logger middleware with configuration
const customLogger = createLoggerMiddleware({
  logFilePath: './logs/request.log',     
  errorLogPath: './logs/errors.log',     
  format: 'json'                         
});

// Apply middlewares
app.use(cors());
app.use(express.json());
app.use(customLogger); // Use the configured logger

// Dummy routes to test
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/books', (req, res) => res.send('Book created'));
app.put('/books/1', (req, res) => res.send('Book updated'));
app.delete('/books/1', (req, res) => res.send('Book deleted'));

// Start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
