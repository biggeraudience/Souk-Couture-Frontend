import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import '../../styles/layouts/_admin-layout.scss'; // New SCSS for admin layout

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-layout__content">
        <div className="admin-layout__header">
          {/* Admin Header Content (e.g., Admin user name, logout button) */}
          <h2>Admin Panel</h2>
        </div>
        <main className="admin-layout__main">
          <Outlet /> {/* This is where nested admin routes will render */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;