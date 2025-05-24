import React from 'react';
import '../../styles/pages/admin/_admin-dashboard.scss'; // New SCSS for dashboard

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-page">
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