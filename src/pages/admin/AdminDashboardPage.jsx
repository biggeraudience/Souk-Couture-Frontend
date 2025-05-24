// src/pages/admin/AdminDashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/pages/admin/_admin-dashboard.scss'; // New SCSS for dashboard

const AdminDashboardPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // New function to handle icon clicks for navigation
  const handleNavigationClick = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div className="admin-dashboard-page">
      {/* New: Navigation Icons at the top */}
      <div className="admin-dashboard-page__nav-icons">
        <div className="nav-icon-item" onClick={() => handleNavigationClick('dashboard')}>
          <span className="icon">📊</span> {/* Dashboard Icon */}
          <span className="text">Dashboard</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('products')}>
          <span className="icon">📦</span> {/* Products Icon */}
          <span className="text">Products</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('users')}>
          <span className="icon">👥</span> {/* Users Icon */}
          <span className="text">Users</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('orders')}>
          <span className="icon">📋</span> {/* Orders Icon */}
          <span className="text">Orders</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('messages')}>
          <span className="icon">✉️</span> {/* Messages Icon */}
          <span className="text">Messages</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('ads-promo')}>
          <span className="icon">📣</span> {/* Ads/Promo Icon */}
          <span className="text">Ads/Promo</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('data-viz')}>
          <span className="icon">📈</span> {/* Data Viz Icon */}
          <span className="text">Data Viz</span>
        </div>
      </div>

      <h1>Admin Dashboard</h1>
      <p>Welcome to your administration panel!</p>

      <section className="dashboard-summary-cards">
        <div className="dashboard-card">
          <h3>Total Sales</h3>
          <p>$12,345.67</p> {/* Placeholder data */}
        </div>
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>567</p> {/* Placeholder data */}
        </div>
        <div className="dashboard-card">
          <h3>New Users</h3>
          <p>89</p> {/* Placeholder data */}
        </div>
        <div className="dashboard-card">
          <h3>Products in Stock</h3>
          <p>1,234</p> {/* Placeholder data */}
        </div>
      </section>

      <section className="dashboard-recent-activity">
        <h3>Recent Orders</h3>
        {/* Placeholder for a list of recent orders */}
        <ul>
          <li>Order #12345 - $50.00 (Pending)</li>
          <li>Order #12344 - $120.00 (Delivered)</li>
          <li>Order #12343 - $75.50 (Processing)</li>
        </ul>
      </section>

      {/* More sections like recent messages, low stock alerts, etc. */}
    </div>
  );
};

export default AdminDashboardPage;