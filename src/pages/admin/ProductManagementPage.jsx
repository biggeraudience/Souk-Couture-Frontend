// src/pages/admin/ProductManagementPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useSelector } from 'react-redux'; // If you're using Redux for auth
import '../../styles/pages/admin/_admin-management.scss';
// import productsData from '../../data/productsData'; // REMOVE this import

const ProductManagementPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]); // Start with an empty array
    const [categories, setCategories] = useState([]); // State to store fetched categories
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [mainImageFile, setMainImageFile] = useState(null); // For the main image file
    const [additionalImageFiles, setAdditionalImageFiles] = useState([]); // For additional image files

    // Get user info from Redux store for token
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // State for the form fields
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        gender: 'unisex', // Default gender for new products
        category: '', // This will store the category _id from the backend
        subCategory: '',
        sizes: '', // Keep as string for comma-separated input
        colors: '', // Keep as string for comma-separated input
        material: '',
        tags: '',
        sku: '',
        stock: '',
        imageUrl: '', // This will be the Cloudinary URL for the main image
        images: '', // This will be a comma-separated string of Cloudinary URLs
        availability: true, // Corresponds to isFeatured in your previous form
        isBespoke: false, // For custom/bespoke items (can be mapped from isFeatured or a new checkbox)
        careInstructions: '',
        weight: '',
        dimensions: { length: '', width: '', height: '' },
        brand: '',
        countryOfOrigin: '',
    });

    // Fetch products and categories on component mount or when form closes/opens
    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            fetchProducts();
            fetchCategories();
        }
    }, [userInfo, isFormOpen]); // Refetch when form state changes

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/admin/products', config);
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            // Categories can be fetched publicly if they are just for display,
            // or with admin token if category management is also admin-only
            const { data } = await axios.get('/api/categories');
            setCategories(data);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    // Function to reset the form fields
    const resetForm = () => {
        setProductForm({
            name: '',
            description: '',
            price: '',
            gender: 'unisex',
            category: '',
            subCategory: '',
            sizes: '',
            colors: '',
            material: '',
            tags: '',
            sku: '',
            stock: '',
            imageUrl: '',
            images: '',
            availability: true,
            isBespoke: false, // Reset this to false
            careInstructions: '',
            weight: '',
            dimensions: { length: '', width: '', height: '' },
            brand: '',
            countryOfOrigin: '',
        });
        setMainImageFile(null);
        setAdditionalImageFiles([]);
        setUploadError(null);
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
        } else {
            setProductForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Handle file input for main image
    const handleMainImageFileChange = (e) => {
        setMainImageFile(e.target.files[0]);
    };

    // Handle file input for additional images
    const handleAdditionalImageFilesChange = (e) => {
        setAdditionalImageFiles(Array.from(e.target.files));
    };

    // Function to upload images to Cloudinary
    const uploadImages = async (files) => {
        const uploadedUrls = [];
        setUploadingImage(true);
        setUploadError(null);

        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file); // 'image' should match the multer field name in uploadRoutes.js

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.post('/api/upload', formData, config);
                uploadedUrls.push(data.imageUrl);
            } catch (err) {
                console.error('Image upload failed:', err);
                setUploadError('Image upload failed: ' + (err.response?.data?.message || err.message));
                setUploadingImage(false);
                return null; // Return null to indicate failure
            }
        }
        setUploadingImage(false);
        return uploadedUrls;
    };

    // Handle submitting the form (add/edit product)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Upload main image if a new file is selected or editing and current main image is not a URL
        let mainImageUrlToSend = productForm.imageUrl;
        if (mainImageFile) { // If a new file is chosen for main image
            const uploadedUrls = await uploadImages([mainImageFile]);
            if (uploadedUrls) {
                mainImageUrlToSend = uploadedUrls[0];
            } else {
                return; // Stop submission if upload failed
            }
        } else if (editingProduct && !productForm.imageUrl && !mainImageFile) {
            // If editing and no image is provided, and no new file selected
            alert('Please upload a main image for the product.');
            return;
        }

        // 2. Upload additional images if new files are selected
        let additionalImageUrlsToSend = [];
        if (additionalImageFiles.length > 0) {
            const uploadedUrls = await uploadImages(additionalImageFiles);
            if (uploadedUrls) {
                additionalImageUrlsToSend = uploadedUrls;
            } else {
                return; // Stop submission if upload failed
            }
        }

        // Combine existing (if editing) and new additional images
        const existingAdditionalImages = editingProduct && productForm.images ?
            productForm.images.split(',').map(url => url.trim()).filter(Boolean) : [];
        const allImages = [mainImageUrlToSend, ...existingAdditionalImages, ...additionalImageUrlsToSend].filter(Boolean); // Filter out empty strings

        // Convert sizes, colors, tags from comma-separated string to array
        const sizesArray = productForm.sizes.split(',').map(s => s.trim()).filter(Boolean);
        const colorsArray = productForm.colors.split(',').map(c => c.trim()).filter(Boolean);
        const tagsArray = productForm.tags.split(',').map(t => t.trim()).filter(Boolean);

        // Map frontend fields to backend schema
        const productData = {
            name: productForm.name,
            description: productForm.description,
            price: Number(productForm.price), // Ensure price is a number
            category: productForm.category, // This is the ID of the category
            sizes: sizesArray,
            colors: colorsArray,
            stock: Number(productForm.stock), // Ensure stock is a number
            isBespoke: productForm.isBespoke, // Map from isFeatured checkbox or a new one
            images: allImages, // All images including main and additional
            gender: productForm.gender,
            subCategory: productForm.subCategory,
            material: productForm.material,
            tags: tagsArray,
            sku: productForm.sku,
            availability: productForm.availability,
            careInstructions: productForm.careInstructions,
            weight: Number(productForm.weight) || 0,
            dimensions: {
                length: Number(productForm.dimensions.length) || 0,
                width: Number(productForm.dimensions.width) || 0,
                height: Number(productForm.dimensions.height) || 0,
            },
            brand: productForm.brand,
            countryOfOrigin: productForm.countryOfOrigin,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            if (editingProduct) {
                // Logic for editing an existing product
                await axios.put(`/api/admin/products/${editingProduct._id}`, productData, config);
                alert('Product updated successfully!');
            } else {
                // Logic for adding a new product
                await axios.post('/api/admin/products', productData, config);
                alert('Product added successfully!');
            }
            setIsFormOpen(false); // Close the form
            resetForm(); // Reset form fields
            fetchProducts(); // Re-fetch products to update the list
        } catch (err) {
            console.error('Product submission failed:', err);
            alert('Product submission failed: ' + (err.response?.data?.message || err.message));
        }
    };

    // Handle editing a product
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            ...product,
            price: product.price.toString(), // Convert number to string for input value
            stock: product.stock.toString(), // Convert number to string for input value
            // Convert arrays back to comma-separated strings for input fields
            sizes: product.sizes.join(', '),
            colors: product.colors.join(', '),
            tags: product.tags ? product.tags.join(', ') : '',
            // Ensure main image URL is set correctly for display
            imageUrl: product.images && product.images.length > 0 ? product.images[0] : '',
            // For additional images, join all but the first (main)
            images: product.images && product.images.length > 1 ? product.images.slice(1).join(', ') : '',
            // Ensure dimensions are structured correctly for the form state
            dimensions: product.dimensions || { length: '', width: '', height: '' },
            availability: product.availability, // Map to frontend field
            isBespoke: product.isBespoke, // Map to frontend field
            weight: product.weight ? product.weight.toString() : '',
            // category will be the ID, which is fine for the select input
        });
        setIsFormOpen(true); // Open the form in edit mode
    };

    // Handle deleting a product
    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`/api/admin/products/${id}`, config);
                alert('Product deleted successfully!');
                fetchProducts(); // Re-fetch products to update the list
            } catch (err) {
                console.error('Product deletion failed:', err);
                alert('Product deletion failed: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const getFilteredCategories = () => {
        if (!productForm.gender || productForm.gender === 'unisex') {
            return categories; // Show all categories if unisex or no gender selected
        }
        return categories.filter(cat => cat.gender === productForm.gender || cat.gender === 'unisex');
    };

    return (
        <div className="admin-management-page">
            <h1>Product Management</h1>
            <p>Manage your store's products here. Create, edit, and delete.</p>

            <button className="btn btn-primary" onClick={() => { setIsFormOpen(true); setEditingProduct(null); }}>
                Add New Product
            </button>

            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error-message">Error: {error}</p>
            ) : (
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
                                    <tr key={product._id}>
                                        <td>{product._id.substring(0, 8)}...</td>
                                        <td>{product.name}</td>
                                        <td>{product.gender || 'N/A'}</td>
                                        <td>{product.category ? product.category.name : 'N/A'}</td> {/* Display category name */}
                                        <td>${product.price ? product.price.toFixed(2) : '0.00'}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.availability ? 'In Stock' : 'Out of Stock'}</td>
                                        <td>
                                            <button className="btn btn-secondary btn-small" onClick={() => handleEditProduct(product)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-error btn-small" onClick={() => handleDeleteProduct(product._id)}>
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
            )}

            {/* Product Add/Edit Form (Modal) */}
            {isFormOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        {uploadingImage && <p>Uploading image(s)...</p>}
                        {uploadError && <p className="error-message">Upload Error: {uploadError}</p>}
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
                                    onChange={handleChange}
                                    required
                                    disabled={categories.length === 0}
                                >
                                    <option value="">Select Category</option>
                                    {getFilteredCategories().map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
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
                                    value={productForm.sizes}
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
                                    value={productForm.colors}
                                    onChange={handleChange}
                                    placeholder="e.g., Red, Blue, Black"
                                />
                            </div>

                            {/* Main Image Upload Field */}
                            <div className="form-group">
                                <label htmlFor="mainImageFile">Upload Main Image:</label>
                                <input
                                    type="file"
                                    id="mainImageFile"
                                    name="mainImageFile"
                                    onChange={handleMainImageFileChange}
                                    accept="image/*" // Restrict to image files
                                    required={!editingProduct} // Required for new products
                                />
                                {productForm.imageUrl && (
                                    <div className="image-preview">
                                        <p>Current Main Image:</p>
                                        <img src={productForm.imageUrl} alt="Main Product" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
                                    </div>
                                )}
                            </div>

                            {/* Additional Images Upload Field */}
                            <div className="form-group">
                                <label htmlFor="additionalImageFiles">Upload Additional Images:</label>
                                <input
                                    type="file"
                                    id="additionalImageFiles"
                                    name="additionalImageFiles"
                                    onChange={handleAdditionalImageFilesChange}
                                    accept="image/*"
                                    multiple // Allow multiple files
                                />
                                {productForm.images && productForm.images.length > 0 && (
                                    <div className="image-preview">
                                        <p>Current Additional Images:</p>
                                        {productForm.images.split(',').map((imgUrl, index) => (
                                            <img key={index} src={imgUrl.trim()} alt={`Product ${index + 1}`} style={{ width: '80px', height: 'auto', margin: '5px' }} />
                                        ))}
                                    </div>
                                )}
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
                                    id="isBespoke" // Changed from isFeatured to isBespoke
                                    name="isBespoke"
                                    checked={productForm.isBespoke}
                                    onChange={handleChange}
                                />
                                <label htmlFor="isBespoke">Bespoke Product</label>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary" disabled={uploadingImage}>
                                    {uploadingImage ? 'Uploading Images...' : (editingProduct ? 'Update Product' : 'Add Product')}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => { setIsFormOpen(false); resetForm(); }} disabled={uploadingImage}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagementPage;