import React from 'react';
import '../../styles/pages/admin/_admin-management.scss';

const AdsPromoManagementPage = () => {
  return (
    <div className="admin-management-page">
      <h1>Ads & Promotions Management</h1>
      <p>Create and manage your advertising campaigns and promotional offers.</p>
      <button className="btn btn-primary">Create New Ad/Promo</button>

      <div className="management-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AD001</td>
              <td>Summer Sale Banner</td>
              <td>Banner</td>
              <td>Active</td>
              <td>2025-06-01</td>
              <td>2025-06-30</td>
              <td>
                <button className="btn btn-secondary btn-small">Edit</button>
                <button className="btn btn-error btn-small">Delete</button>
              </td>
            </tr>
            {/* More ad/promo rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdsPromoManagementPage;