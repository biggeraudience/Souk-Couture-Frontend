import React from 'react';
import '../../styles/pages/admin/_admin-management.scss'; // General SCSS for management pages

const ProductManagementPage = () => {
  return (
    <div className="admin-management-page">
      <h1>Product Management</h1>
      <p>Manage your store's products here. Create, edit, and delete.</p>
      <button className="btn btn-primary">Add New Product</button>

      <div className="management-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Elegant Kaftan</td>
              <td>Clothing</td>
              <td>$150.00</td>
              <td>25</td>
              <td>
                <button className="btn btn-secondary btn-small">Edit</button>
                <button className="btn btn-error btn-small">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Leather Handbag</td>
              <td>Bags</td>
              <td>$200.00</td>
              <td>10</td>
              <td>
                <button className="btn btn-secondary btn-small">Edit</button>
                <button className="btn btn-error btn-small">Delete</button>
              </td>
            </tr>
            {/* More product rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementPage;