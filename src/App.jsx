import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/layout/Navbar'; // Import the Navbar component
import Footer from './components/layout/Footer'; // Import the Footer component

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (backendUrl) {
      console.log('Frontend: Attempting to connect to backend at:', backendUrl);
      fetch(`${backendUrl}/api/test`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setBackendMessage(data.message);
          console.log('Frontend: Backend Response received:', data.message);
        })
        .catch(err => {
          setError(`Failed to connect to backend: ${err.message}. Check browser console for details.`);
          console.error('Frontend: Error connecting to backend:', err);
        });
    } else {
      setError('VITE_BACKEND_URL environment variable is not defined!');
      console.error('Frontend: VITE_BACKEND_URL is not defined in import.meta.env');
    }
  }, []);

  return (
    <> {/* Use a React Fragment to wrap multiple top-level elements */}
      <Navbar /> {/* The Navbar will now appear at the top of every page */}

      <Routes>
        {/* Render the LandingPage component when the path is exactly '/' */}
        <Route path="/" element={<LandingPage />} />

        {/* Placeholder routes for future navigation */}
        <Route path="/register" element={<div>Register Page Placeholder</div>} />
        <Route path="/menslandingpage" element={<div>Men's Landing Page Placeholder</div>} />
        <Route path="/womenslandingpage" element={<div>Women's Landing Page Placeholder</div>} />

        {/* You can add a 404 Not Found page here later */}
        <Route path="*" element={<div>404: Not Found</div>} />
      </Routes>

      <Footer /> {/* The Footer will now appear at the bottom of every page */}
    </>
  );
}

export default App;