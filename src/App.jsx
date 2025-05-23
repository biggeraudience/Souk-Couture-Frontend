import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenderLandingPage from './pages/GenderLandingPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Import the new component
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductsPage from './pages/ProductsPage';
import Sidebar from './components/layout/Sidebar'; // Import the Sidebar component


function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Effect to manage body scroll when sidebar is open/closed
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isSidebarOpen]);

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
      {/* Pass isSidebarOpen and toggleSidebar to Navbar */}
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Render the Sidebar component */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menslandingpage" element={<GenderLandingPage gender="men" />} />
          <Route path="/womenslandingpage" element={<GenderLandingPage gender="women" />} />
          <Route path="/products" element={<ProductsPage />} />
          {/* Add the new route for product details */}
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/register" element={<div>Register Page Placeholder</div>} />
          <Route path="*" element={<div>404: Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;



