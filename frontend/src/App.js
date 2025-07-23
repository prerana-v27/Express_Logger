import React from 'react';
import axios from 'axios';
import './App.css';

// Base URL of the backend
const BASE_URL = 'https://express-logger.onrender.com';

function App() {
  // Generic request function
  const sendRequest = async (method, url, data = null) => {
    try {
      const config = {
        method,
        url: `${BASE_URL}${url}`,
        data
      };
      const response = await axios(config);
      alert(`${method} request successful: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error(`${method} request failed`, error);
      alert(`${method} request failed. Check console.`);
    }
  };

  // Handlers for each method
  const handleGet = () => sendRequest('GET', '/');
  const handlePost = () => sendRequest('POST', '/books', { title: 'React Book' });
  const handlePut = () => sendRequest('PUT', '/books/1', { title: 'Updated Book' });
  const handleDelete = () => sendRequest('DELETE', '/books/1');

  return (
    <div className="App">
      <h1>EXPRESS LOGGER TESTER</h1>
      <div className="cards">
        <div className="card">
          <p>Checking GET request logging.</p>
          <button onClick={handleGet}>GET /</button>
        </div>
        <div className="card">
          <p>Checking POST request logging.</p>
          <button onClick={handlePost}>POST /books</button>
        </div>
        <div className="card">
          <p>Checking PUT request logging.</p>
          <button onClick={handlePut}>PUT /books/1</button>
        </div>
        <div className="card">
          <p>Checking DELETE request logging.</p>
          <button onClick={handleDelete}>DELETE /books/1</button>
        </div>
      </div>
    </div>
  );
}

export default App;
