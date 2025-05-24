import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import '../../styles/components/_admin-sidebar.scss'; // New SCSS for admin sidebar

const AdminSidebar = () => {
  // SVG icons for Admin Sidebar (you can replace these with actual SVG components)
  const DashboardIcon = () => <svg className="admin-sidebar__icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
  const ProductIcon = () => <svg className="admin-sidebar__icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h12v12z"/></svg>;
  const UserIcon = () => <svg className="admin-sidebar__icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.67 0-5.33-1.34-5.33-4s2.67-4 5.33-4 5.33 1.34 5.33 4-2.66 4-5.33 4z"/></svg>;
  const OrderIcon = () => <svg className="admin-sidebar__icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zm-4 4.5v-9H2V19h7zM7.5 7.5h-3v-3h3v3z"/></svg>;
  const AdsPromoIcon = () => <svg className="admin-sidebar__icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zm-4-6h-2V9h2v4z"/></svg>;
  const MessageIcon = () => <svg className="admin-sidebar__icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>;
  const DataVizIcon = () => <svg className="admin-sidebar__icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14v14H5zm2-10h2v8H7zm4-4h2v12h-2zm4 7h2v5h-2z"/></svg>;


  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <h3 className="admin-sidebar__logo">SOUK COUTURE <br/>ADMIN</h3>
      </div>
      <nav className="admin-sidebar__nav">
        <ul className="admin-sidebar__list">
          <li>
            <NavLink to="/admin/dashboard" className="admin-sidebar__link" activeClassName="admin-sidebar__link--active">
              <DashboardIcon />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" className="admin-sidebar__link" activeClassName="admin-sidebar__link--active">
              <ProductIcon />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className="admin-sidebar__link" activeClassName="admin-sidebar__link--active">
              <UserIcon />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className="admin-sidebar__link" activeClassName="admin-sidebar__link--active">
              <OrderIcon />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/ads-promo" className="admin-sidebar__link" activeClassName="admin-sidebar__link--active">
              <AdsPromoIcon />
              <span>Ads & Promo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/messages" className="admin-sidebar__link" activeClassName="admin-sidebar__link--active">
              <MessageIcon />
              <span>Messages</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/data-viz" className="admin-sidebar__link" activeClassName="admin-sidebar__link--active">
              <DataVizIcon />
              <span>Data Viz</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Optional: Admin Footer or version info */}
      <div className="admin-sidebar__footer">
        <p>&copy; 2025 Souk Couture Admin</p>
      </div>
    </aside>
  );
};

export default AdminSidebar;