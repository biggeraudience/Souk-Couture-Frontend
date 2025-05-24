// src/pages/admin/ProductManagementPage.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/pages/admin/_admin-management.scss';
import productsData from '../../data/productsData'; // Assuming you'll create this file

const ProductManagementPage = () => {
  // State to manage the visibility of the product form (add/edit modal)
  const [isFormOpen, setIsFormOpen] = useState(false);
  // State to hold the product data for editing (if null, it's a new product)
  const [editingProduct, setEditingProduct] = useState(null);
  // State to store the list of products (mock data for now)
  const [products, setProducts] = useState(productsData); // Initialize with mock data

  // Categories based on your input
  const categories = {
    men: ['Clothing', 'Bags', 'Fabrics', 'Shoes', 'Accessories', 'Caps', 'Perfumes'],
    women: ['Clothing', 'Bags', 'Fabrics', 'Shoes', 'Accessories', 'Jewelry', 'Perfumes'],
  };

  // State for the form fields
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    gender: 'men', // Default gender
    category: '',
    subCategory: '', // Subcategory field
    sizes: [],
    colors: [],
    material: '',
    tags: '', // Comma-separated tags
    sku: '',
    stock: '',
    imageUrl: '', // Main display image
    images: [], // Array for additional images
    availability: true,
    isFeatured: false,
    careInstructions: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    brand: '',
    countryOfOrigin: '',
    // Add any other fields you deem necessary
  });

  // Effect to reset form when closing or opening for a new product
  useEffect(() => {
    if (!isFormOpen) {
      setEditingProduct(null); // Clear editing product when form closes
      resetForm();
    }
  }, [isFormOpen]);

  // Function to reset the form fields
  const resetForm = () => {
    setProductForm({
      id: '',
      name: '',
      description: '',
      price: '',
      gender: 'men',
      category: '',
      subCategory: '',
      sizes: [],
      colors: [],
      material: '',
      tags: '',
      sku: '',
      stock: '',
      imageUrl: '',
      images: [],
      availability: true,
      isFeatured: false,
      careInstructions: '',
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      brand: '',
      countryOfOrigin: '',
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "dimensions") {
      setProductForm((prev) => ({
        ...prev,
        dimensions: { ...prev.dimensions, [e.target.dataset.dim]: value },
      }));
    } else if (type === 'checkbox') {
      setProductForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'sizes' || name === 'colors' || name === 'images' || name === 'tags') {
      // For array fields, split by comma and trim whitespace
      setProductForm((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()).filter(item => item !== ''),
      }));
    } else {
      setProductForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle category change to update subcategories
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setProductForm((prev) => ({
      ...prev,
      category: newCategory,
      subCategory: '', // Reset subcategory when category changes
    }));
  };

  // Handle submitting the form (add/edit product)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      // Logic for editing an existing product
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...productForm, id: p.id } : p)));
      console.log('Product Updated:', productForm);
    } else {
      // Logic for adding a new product
      const newProduct = { ...productForm, id: (products.length + 1).toString() }; // Simple ID generation
      setProducts([...products, newProduct]);
      console.log('New Product Added:', newProduct);
    }
    setIsFormOpen(false); // Close the form
    resetForm(); // Reset form fields
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      ...product,
      // Convert arrays back to comma-separated strings for input fields
      sizes: product.sizes.join(', '),
      colors: product.colors.join(', '),
      tags: product.tags ? product.tags.join(', ') : '',
      images: product.images ? product.images.join(', ') : '',
      // Ensure dimensions are structured correctly for the form state
      dimensions: product.dimensions || { length: '', width: '', height: '' },
    });
    setIsFormOpen(true); // Open the form in edit mode
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
      console.log('Product Deleted:', id);
    }
  };

  return (
    <div className="admin-management-page">
      <h1>Product Management</h1>
      <p>Manage your store's products here. Create, edit, and delete.</p>

      <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
        Add New Product
      </button>

      {/* Product Add/Edit Form (Modal) */}
      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              {/* Basic Details */}
              <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productForm.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={productForm.description}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price ($):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productForm.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock Quantity:</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" value={productForm.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={productForm.category}
                  onChange={handleCategoryChange}
                  required
                  disabled={!productForm.gender} // Disable until gender is selected
                >
                  <option value="">Select Category</option>
                  {productForm.gender &&
                    categories[productForm.gender]?.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              {/* Subcategory (Optional, if you have specific subcategories per category) */}
              {productForm.category && (
                <div className="form-group">
                  <label htmlFor="subCategory">Subcategory (Optional):</label>
                  <input
                    type="text"
                    id="subCategory"
                    name="subCategory"
                    value={productForm.subCategory}
                    onChange={handleChange}
                    placeholder="e.g., T-Shirts, Handbags, Engagement Rings"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="sizes">Sizes (comma-separated, e.g., S, M, L, XL or 7, 8, 9):</label>
                <input
                  type="text"
                  id="sizes"
                  name="sizes"
                  value={productForm.sizes.join(', ')}
                  onChange={handleChange}
                  placeholder="e.g., S, M, L or 7, 8, 9"
                />
              </div>

              <div className="form-group">
                <label htmlFor="colors">Colors (comma-separated, e.g., Red, Blue, Black):</label>
                <input
                  type="text"
                  id="colors"
                  name="colors"
                  value={productForm.colors.join(', ')}
                  onChange={handleChange}
                  placeholder="e.g., Red, Blue, Black"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">Main Image URL:</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={productForm.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="images">Additional Image URLs (comma-separated):</label>
                <textarea
                  id="images"
                  name="images"
                  value={productForm.images.join(', ')}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g., url1, url2, url3"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="material">Material:</label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={productForm.material}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated, e.g., summer, casual, cotton):</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={productForm.tags}
                  onChange={handleChange}
                  placeholder="e.g., summer, casual, cotton"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sku">SKU (Stock Keeping Unit):</label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={productForm.sku}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand:</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={productForm.brand}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="countryOfOrigin">Country of Origin:</label>
                <input
                  type="text"
                  id="countryOfOrigin"
                  name="countryOfOrigin"
                  value={productForm.countryOfOrigin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="careInstructions">Care Instructions:</label>
                <textarea
                  id="careInstructions"
                  name="careInstructions"
                  value={productForm.careInstructions}
                  onChange={handleChange}
                  rows="2"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight (kg):</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={productForm.weight}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group dimensions-group">
                <label>Dimensions (cm):</label>
                <div className="dimensions-inputs">
                  <input
                    type="number"
                    name="dimensions"
                    data-dim="length"
                    value={productForm.dimensions.length}
                    onChange={handleChange}
                    placeholder="Length"
                    min="0"
                    step="0.01"
                  />
                  <input
                    type="number"
                    name="dimensions"
                    data-dim="width"
                    value={productForm.dimensions.width}
                    onChange={handleChange}
                    placeholder="Width"
                    min="0"
                    step="0.01"
                  />
                  <input
                    type="number"
                    name="dimensions"
                    data-dim="height"
                    value={productForm.dimensions.height}
                    onChange={handleChange}
                    placeholder="Height"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>


              <div className="form-group form-group--checkbox">
                <input
                  type="checkbox"
                  id="availability"
                  name="availability"
                  checked={productForm.availability}
                  onChange={handleChange}
                />
                <label htmlFor="availability">Available for Sale</label>
              </div>

              <div className="form-group form-group--checkbox">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={productForm.isFeatured}
                  onChange={handleChange}
                />
                <label htmlFor="isFeatured">Featured Product</label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Existing Products Table */}
      <div className="management-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.gender}</td>
                  <td>{product.category}</td>
                  <td>${product.price ? product.price.toFixed(2) : '0.00'}</td>
                  <td>{product.stock}</td>
                  <td>{product.availability ? 'In Stock' : 'Out of Stock'}</td>
                  <td>
                    <button className="btn btn-secondary btn-small" onClick={() => handleEditProduct(product)}>
                      Edit
                    </button>
                    <button className="btn btn-error btn-small" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No products found. Add a new product to get started!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementPage;