// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenderLandingPage from './pages/GenderLandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductsPage from './pages/ProductsPage';
import Sidebar from './components/layout/Sidebar';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage'; // Import the new CheckoutPage

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
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

  const addItemToCart = (itemToAdd) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === itemToAdd.id &&
          item.selectedSize === itemToAdd.selectedSize &&
          JSON.stringify(item.selectedColors) === JSON.stringify(itemToAdd.selectedColors)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += itemToAdd.quantity || 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...itemToAdd, quantity: itemToAdd.quantity || 1 }];
      }
    });
  };

  const updateCartItemQuantity = (id, selectedSize, selectedColors, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id &&
          item.selectedSize === selectedSize &&
          JSON.stringify(item.selectedColors) === JSON.stringify(selectedColors)
            ? { ...item, quantity: Math.max(1, parseInt(newQuantity) || 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (idToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== idToRemove)
    );
  };

  const clearAllCartItems = () => {
    setCartItems([]);
  };

  const addFavorite = (itemToAdd) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(fav => fav.id === itemToAdd.id)) {
        return [...prevFavorites, itemToAdd];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (idToRemove) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== idToRemove)
    );
  };

  const totalCartValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBagIconClick = () => {
    navigate('/cart');
  };

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        cartItemCount={cartItems.length}
        onBagIconClick={handleBagIconClick}
      />

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
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                favorites={favorites}
                updateQuantity={updateCartItemQuantity}
                removeItem={removeCartItem}
                addItemToCart={addItemToCart}
                removeFavorite={removeFavorite}
                clearAllItems={clearAllCartItems}
                total={totalCartValue}
              />
            }
          />
          {/* Add the new CheckoutPage route */}
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                total={totalCartValue}
                clearAllItems={clearAllCartItems}
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProductDetailPage
                addItemToCart={addItemToCart}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                isFavorited={(productId) => favorites.some(fav => fav.id === productId)}
              />
            }
          />
          <Route path="/register" element={<div>Register Page Placeholder</div>} />
          <Route path="/order-confirmation" element={<div>Order Confirmation Page!</div>} /> {/* Simple confirmation page */}
          <Route path="*" element={<div>404: Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;