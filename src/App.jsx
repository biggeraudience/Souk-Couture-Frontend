import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenderLandingPage from './pages/GenderLandingPage'; // Correct import for GenderLandingPage
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductsPage from './pages/ProductsPage'; 


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
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menslandingpage" element={<GenderLandingPage gender="men" />} />
          <Route path="/womenslandingpage" element={<GenderLandingPage gender="women" />} />
          <Route path="/products" element={<ProductsPage />} /> {/* Add this line */}
          <Route path="/register" element={<div>Register Page Placeholder</div>} />
          <Route path="*" element={<div>404: Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;