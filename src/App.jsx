import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import LandingPage from './pages/LandingPage';
import GenderLandingPage from './pages/GenderLandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductsPage from './pages/ProductsPage';
import Sidebar from './components/layout/Sidebar';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import FilterBar from './components/layout/FilterBar';

// NEW ADMIN IMPORTS
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminLayout from './components/admin/AdminLayout'; // The new admin layout wrapper
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';
import AdsPromoManagementPage from './pages/admin/AdsPromoManagementPage';
import MessageManagementPage from './pages/admin/MessageManagementPage';
import DataVisualizationPage from './pages/admin/DataVisualizationPage';


function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // State for global filters
  const [globalFilters, setGlobalFilters] = useState({
    category: 'All',
    priceRange: 'All',
    sort: 'None',
  });

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

  // Function to update filters from FilterBar
  const handleFilterChange = (newFilters) => {
    setGlobalFilters(newFilters);
  };

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        cartItemCount={cartItems.length}
        onBagIconClick={handleBagIconClick}
      />

      {/* The main sidebar is always rendered but its open state is controlled by prop */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Conditionally render FilterBar based on the route (unchanged) */}
      <Routes>
        <Route path="/products" element={<FilterBar onFilterChange={handleFilterChange} />} />
        <Route path="/products/:productId" element={null} />
      </Routes>

      <main>
        <Routes>
          {/* Public/Customer Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/menslandingpage" element={<GenderLandingPage gender="men" />} />
          <Route path="/womenslandingpage" element={<GenderLandingPage gender="women" />} />
          <Route path="/products" element={<ProductsPage filters={globalFilters} />} />
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

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Admin Routes - Wrapped by AdminLayout */}
          {/* In a real app, this would be protected by an AdminRoute component */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} /> {/* Default admin route */}
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="products" element={<ProductManagementPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="orders" element={<OrderManagementPage />} />
            <Route path="ads-promo" element={<AdsPromoManagementPage />} />
            <Route path="messages" element={<MessageManagementPage />} />
            <Route path="data-viz" element={<DataVisualizationPage />} />
          </Route>

          {/* Fallback Routes */}
          <Route path="/order-confirmation" element={<div>Order Confirmation Page!</div>} />
          <Route path="*" element={<div>404: Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;