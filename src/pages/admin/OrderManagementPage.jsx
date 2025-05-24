import React from 'react';
import '../../styles/pages/admin/_admin-management.scss';

const OrderManagementPage = () => {
  return (
    <div className="admin-management-page">
      <h1>Order Management</h1>
      <p>View and manage all customer orders.</p>

      <div className="management-table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#A001</td>
              <td>John Doe</td>
              <td>2025-05-20</td>
              <td>$150.00</td>
              <td>Pending</td>
              <td>
                <button className="btn btn-secondary btn-small">View</button>
                <button className="btn btn-primary btn-small">Mark Delivered</button>
              </td>
            </tr>
            <tr>
              <td>#A002</td>
              <td>Jane Smith</td>
              <td>2025-05-18</td>
              <td>$220.00</td>
              <td>Processing</td>
              <td>
                <button className="btn btn-secondary btn-small">View</button>
                <button className="btn btn-primary btn-small">Mark Delivered</button>
              </td>
            </tr>
            {/* More order rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagementPage;