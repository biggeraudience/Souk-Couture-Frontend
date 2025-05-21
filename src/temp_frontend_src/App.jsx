import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [testMessage, setTestMessage] = useState('Attempting to connect to backend...');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!BACKEND_URL) {
      setTestMessage('VITE_BACKEND_URL not set in Netlify environment variables!');
      return;
    }
    fetch(`${BACKEND_URL}/api/test`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setTestMessage(`Backend Test Message: ${data.message}`))
      .catch(error => {
        console.error('Error fetching from backend:', error);
        setTestMessage(`Failed to connect to backend: ${error.message}. Check browser console for details.`);
      });
  }, [BACKEND_URL]);


  return (
    <AuthProvider>
      <div className="App">
        <header style={{ padding: '20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <h1>Souk Couture Frontend Skeleton</h1>
          <p>{testMessage}</p>
          <p>Configured Backend URL: {BACKEND_URL || 'Not Set'}</p>
          <p>This is a temporary test. Check browser console & Netlify logs.</p>
        </header>

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
