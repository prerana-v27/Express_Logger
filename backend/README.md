# Express Request Logging Middleware


Project: **Full-Stack Book Management Application with Request Logging Middleware**

This project implements a custom **Request Logging Middleware** for an Express-based backend API, along with a React frontend for triggering and testing API requests. It captures essential request details and stores them in log files for monitoring and debugging purposes.

---

## Features

- Logs **request method**, **URL**, and **timestamp**
- Supports **JSON** and **Text** formats (default is JSON)
- Logs are saved in `logs/request.log`
- Errors (e.g., file write issues) are logged in `logs/errors.log`
- Middleware is **configurable** with custom log file paths and formats
- React UI for easy testing of `GET`, `POST`, `PUT`, and `DELETE` requests

---

## Project Structure

```

express\_logger/
│
├── backend/
│   ├── index.js                # Express app with middleware and routes
│   ├── loggerMiddleware.js     # Custom logging middleware
│   └── logs/
│       ├── request.log         # Stores successful request logs
│       └── errors.log          # Stores logging errors
│
└── frontend/
└── src/
├── App.js              # React UI for testing API routes
└── App.css             # Styling for the frontend

````

---

## Setup Instructions

### 1. Clone the Repository

```bash
[git clone https://github.com/prerana-v27/express-logger.git
cd express-logger](https://github.com/prerana-v27/Express_Logger.git)
````

---

### 2. Backend Setup (Express)

```bash
cd backend
npm install
node index.js
```

This starts the Express server at:
`http://localhost:5000`

---

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm start
```

This starts the React frontend at:
`http://localhost:3000`

---

## Logger Middleware Details

### Request Information Captured

* **Method:** GET, POST, PUT, DELETE
* **URL:** Requested route
* **Timestamp:** ISO format datetime

### Logging Format

Example entry in `request.log`:

```json
{"method":"POST","url":"/books","timestamp":"2025-07-22T12:05:42.490Z"}
```

---

## Configuration Options

You can pass the following options to the middleware:

```js
const customLogger = createLoggerMiddleware({
  logFilePath: './logs/request.log',     // Custom request log path
  errorLogPath: './logs/errors.log',     // Custom error log path
  format: 'json'                         // Format: 'json' or 'text'
});
```

---

## Error Handling

If an error occurs while writing to the request log, it will:

1. Print an error in the console
2. Write a detailed message to `errors.log`

Example entry in `errors.log`:

```
[2025-07-22T11:38:21.966Z] Failed to write to ./logs/request.log: EPERM: operation not permitted
```

---

## Testing the Middleware

### Functionality Tests

| Request           | Expected Behavior                    |
| ----------------- | ------------------------------------ |
| `GET /`           | Logs method: GET, URL: `/`           |
| `POST /books`     | Logs method: POST, URL: `/books`     |
| `PUT /books/1`    | Logs method: PUT, URL: `/books/1`    |
| `DELETE /books/1` | Logs method: DELETE, URL: `/books/1` |

Use the React frontend buttons to trigger these requests.

### Error Test

To simulate a logging error:

* Make `request.log` **read-only**, or
* Temporarily **remove the `logs/` directory**, then send a request.

You should see:

* Console output with the error
* Entry added in `errors.log`

---

## Deployment Notes

* Ensure that `logs/` folder exists and is writable in your production environment.
* Configure absolute paths or environment variables for `logFilePath` if needed.
* Monitor log file sizes and rotate them periodically in production.

---

## Monitoring

After deployment:

* Watch `request.log` to confirm all requests are captured.
* Check `errors.log` for any middleware issues or write failures.
* Monitor performance—this middleware is lightweight but consider batching/log rotation for large traffic.


---



