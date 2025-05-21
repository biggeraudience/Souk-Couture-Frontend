import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css'; // Assuming you have an App.css

function App() {
  const [count, setCount] = useState(0);
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // --- Backend Test API Call ---
    // This environment variable (VITE_BACKEND_URL) will be set on Netlify
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (backendUrl) {
      console.log('Frontend: Attempting to connect to backend at:', backendUrl); // Log for debugging
      fetch(`${backendUrl}/api/test`) // Make the API call to your backend's test endpoint
        .then(response => {
          if (!response.ok) {
            // If response is not OK (e.g., 404, 500, or CORS), throw an error
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
          }
          return response.json(); // Use .json() because your backend sends { message: "..." }
        })
        .then(data => {
          setBackendMessage(data.message); // Set the message from the backend's JSON response
          console.log('Frontend: Backend Response received:', data.message); // Log success
        })
        .catch(err => {
          // Handle any errors during the fetch operation (e.g., network issues, CORS)
          console.error('Frontend: Error connecting to backend:', err);
          setError(`Failed to connect to backend: ${err.message}. Check browser console for details.`);
        });
    } else {
      setError('VITE_BACKEND_URL environment variable is not defined!');
      console.error('Frontend: VITE_BACKEND_URL is not defined in import.meta.env');
    }
  }, []); // Empty dependency array means this runs only once after initial render

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <hr /> {/* Separator */}

      {/* Display backend connection status */}
      <h2>Backend Connection Status:</h2>
      {backendMessage ? (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{backendMessage}</p>
      ) : error ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <p>Attempting to connect to backend...</p>
      )}
    </>
  );
}

export default App;