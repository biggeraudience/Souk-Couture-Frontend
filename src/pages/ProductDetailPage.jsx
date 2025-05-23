import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../src/styles/pages/_product-detail-page.scss'; // Import the SCSS

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock product data for demonstration.
  // In a real application, you'd fetch this from your backend.
  const mockProducts = [
    {
      id: '1',
      name: 'Classic Black Hoodie',
      price: 49.99,
      description: 'A comfortable and stylish black hoodie, perfect for everyday wear. Made from high-quality cotton blend. Features a kangaroo pocket and adjustable drawstring hood.',
      imageUrl: 'https://via.placeholder.com/600x600/000000/FFFFFF?text=Black+Hoodie',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Grey', 'Navy'],
    },
    {
      id: '2',
      name: 'Vintage Denim Jacket',
      price: 89.00,
      description: 'Timeless vintage style denim jacket with a relaxed fit. Durable and perfect for layering. Features multiple pockets and button-front closure.',
      imageUrl: 'https://via.placeholder.com/600x600/4682B4/FFFFFF?text=Denim+Jacket',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Blue', 'Light Blue'],
    },
    {
      id: '3',
      name: 'Graphic Tee "Abstract"',
      price: 29.50,
      description: 'Express yourself with this unique abstract graphic tee. Soft, breathable cotton for ultimate comfort. Perfect for casual outings.',
      imageUrl: 'https://via.placeholder.com/600x600/8A2BE2/FFFFFF?text=Graphic+Tee',
      sizes: ['S', 'M', 'L'],
      colors: ['White', 'Black', 'Green'],
    },
  ];

  useEffect(() => {
    // Simulate fetching product data
    setLoading(true);
    setError(null);
    const foundProduct = mockProducts.find(p => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0] || ''); // Set first size as default
      setSelectedColor(foundProduct.colors[0] || ''); // Set first color as default
    } else {
      setError('Product not found.');
    }
    setLoading(false);
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color.');
      return;
    }
    // In a real app, you'd dispatch an action to add to a cart state or send to backend
    console.log(`Added ${quantity} x ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) to cart.`);
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  if (loading) {
    return <div className="product-detail-page loader">Loading product details...</div>;
  }

  if (error) {
    return <div className="product-detail-page error-message">{error}</div>;
  }

  if (!product) {
    return <div className="product-detail-page">No product data available.</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-page__image-gallery">
        {/* Main Product Image */}
        <img src={product.imageUrl} alt={product.name} className="product-detail-page__main-image" />
        {/* You can add a small gallery of thumbnail images here if available */}
        <div className="product-detail-page__thumbnails">
          {/* Example: <img src={product.thumbnail1} alt="thumbnail" /> */}
        </div>
      </div>

      <div className="product-detail-page__details">
        <h1 className="product-detail-page__name">{product.name}</h1>
        <p className="product-detail-page__price">${product.price.toFixed(2)}</p>
        <p className="product-detail-page__description">{product.description}</p>

        <div className="product-detail-page__options">
          <div className="product-detail-page__option-group">
            <label htmlFor="size-select" className="product-detail-page__option-label">Size:</label>
            <div className="product-detail-page__size-buttons">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`btn ${selectedSize === size ? 'btn--active' : 'btn--inactive'}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail-page__option-group">
            <label htmlFor="color-select" className="product-detail-page__option-label">Color:</label>
            <div className="product-detail-page__color-options">
              {product.colors.map(color => (
                <div
                  key={color}
                  className={`product-detail-page__color-swatch product-detail-page__color-swatch--${color.toLowerCase().replace(/\s/g, '-')}`}
                  style={{ backgroundColor: color }} // This is a simple example; for more control, use classes and SCSS variables
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <svg className="product-detail-page__check-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="product-detail-page__quantity-selector">
            <label htmlFor="quantity-input" className="product-detail-page__option-label">Quantity:</label>
            <input
              type="number"
              id="quantity-input"
              className="form-input product-detail-page__quantity-input"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        </div>

        <button
          className="btn btn--large product-detail-page__add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;