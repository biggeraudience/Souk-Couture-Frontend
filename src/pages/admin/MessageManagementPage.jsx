import React from 'react';
import '../../styles/pages/admin/_admin-management.scss';

const MessageManagementPage = () => {
  return (
    <div className="admin-management-page">
      <h1>Message Management</h1>
      <p>View and respond to customer inquiries and messages.</p>

      <div className="management-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MSG001</td>
              <td>Alice Brown</td>
              <td>alice@example.com</td>
              <td>Question about order #A001</td>
              <td>2025-05-23</td>
              <td>New</td>
              <td>
                <button className="btn btn-primary btn-small">View/Reply</button>
                <button className="btn btn-secondary btn-small">Archive</button>
              </td>
            </tr>
            {/* More message rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageManagementPage;