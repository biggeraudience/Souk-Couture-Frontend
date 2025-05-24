import React from 'react';
import '../../styles/pages/admin/_admin-management.scss';

const UserManagementPage = () => {
  return (
    <div className="admin-management-page">
      <h1>User Management</h1>
      <p>Manage registered users, their roles, and access.</p>

      <div className="management-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>John Doe</td>
              <td>john.doe@example.com</td>
              <td>Yes</td>
              <td>
                <button className="btn btn-secondary btn-small">Edit</button>
                <button className="btn btn-error btn-small">Delete</button>
              </td>
            </tr>
            <tr>
              <td>102</td>
              <td>Jane Smith</td>
              <td>jane.smith@example.com</td>
              <td>No</td>
              <td>
                <button className="btn btn-secondary btn-small">Edit</button>
                <button className="btn btn-error btn-small">Delete</button>
              </td>
            </tr>
            {/* More user rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;