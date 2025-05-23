import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Assuming lucide-react is still desired for icons, if not, they can be removed
import { Check, Minus, Plus } from 'lucide-react';
import '../../src/styles/pages/_product-detail-page.scss'; // Import the SCSS file

const ProductDetailPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addToCartMessage, setAddToCartMessage] = useState(''); // State for "Added to Cart" message

  // Mock product data with more detail, including hex colors and reviews
  const mockProducts = [
    {
      id: '1',
      name: 'Cozy Knit Sweater',
      price: 69.99,
      description: 'Experience ultimate comfort with our cozy knit sweater. Made from a premium wool blend, it’s perfect for chilly evenings. Features a ribbed collar, cuffs, and hem.',
      imageUrl: 'https://placehold.co/600x600/F0F0F0/333333?text=Cozy+Sweater',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Cream', hex: '#F5F5DC' },
        { name: 'Charcoal', hex: '#36454F' },
        { name: 'Forest Green', hex: '#228B22' },
      ],
      reviews: [
        { id: 1, author: 'Alice', rating: 5, comment: 'Absolutely love this sweater! So soft and warm.' },
        { id: 2, author: 'Bob', rating: 4, comment: 'Good quality, but a bit looser fit than expected.' },
      ],
    },
    {
      id: '2',
      name: 'Urban Explorer Backpack',
      price: 120.00,
      description: 'Designed for the modern adventurer, this durable backpack features multiple compartments, a padded laptop sleeve, and water-resistant material. Ideal for daily commutes or weekend trips.',
      imageUrl: 'https://placehold.co/600x600/D3D3D3/000000?text=Urban+Backpack',
      sizes: ['One Size'],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Olive', hex: '#808000' },
      ],
      reviews: [
        { id: 3, author: 'Charlie', rating: 5, comment: 'Best backpack I\'ve ever owned. So much space!' },
        { id: 4, author: 'Diana', rating: 5, comment: 'Stylish and functional. Highly recommend.' },
      ],
    },
    {
      id: '3',
      name: 'Minimalist Leather Wallet',
      price: 35.50,
      description: 'A sleek and slim wallet crafted from genuine leather. Perfect for carrying essentials without bulk. Features multiple card slots and a cash pocket.',
      imageUrl: 'https://placehold.co/600x600/A9A9A9/FFFFFF?text=Leather+Wallet',
      sizes: ['N/A'], // Not applicable for wallets
      colors: [
        { name: 'Brown', hex: '#A52A2A' },
        { name: 'Black', hex: '#000000' },
      ],
      reviews: [
        { id: 5, author: 'Eve', rating: 4, comment: 'Nice compact wallet, good quality leather.' },
      ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === productId);

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0] || '');
        setSelectedColor(foundProduct.colors[0]?.name || '');
      } else {
        setError('Product not found.');
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && product.sizes[0] !== 'N/A' && !selectedSize) {
      setAddToCartMessage('Please select a size.');
      setTimeout(() => setAddToCartMessage(''), 3000);
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      setAddToCartMessage('Please select a color.');
      setTimeout(() => setAddToCartMessage(''), 3000);
      return;
    }

    console.log(`Added ${quantity} x ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) to cart.`);
    setAddToCartMessage(`Added ${quantity} x ${product.name} to cart!`);
    setTimeout(() => setAddToCartMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="product-detail-page product-detail-page--loading">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-page product-detail-page--error">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page product-detail-page--no-data">
        No product data available.
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-page__image-gallery">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-detail-page__main-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x600/CCCCCC/333333?text=Image+Not+Found`;
          }}
        />
        {/* Add thumbnail gallery here if multiple images are available */}
      </div>

      <div className="product-detail-page__details">
        <h1 className="product-detail-page__name">{product.name}</h1>
        <p className="product-detail-page__price">${product.price.toFixed(2)}</p>
        <p className="product-detail-page__description">{product.description}</p>

        <div className="product-detail-page__options">
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'N/A' && (
            <div className="product-detail-page__option-group">
              <label className="product-detail-page__option-label">Size:</label>
              <div className="product-detail-page__size-buttons">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`btn ${selectedSize === size ? 'btn--active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="product-detail-page__option-group">
              <label className="product-detail-page__option-label">Color:</label>
              <div className="product-detail-page__color-options">
                {product.colors.map(color => (
                  <div
                    key={color.name}
                    className={`product-detail-page__color-swatch ${selectedColor === color.name ? 'product-detail-page__color-swatch--active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                  >
                    {selectedColor === color.name && (
                      <Check className="product-detail-page__check-icon" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="product-detail-page__quantity-selector">
            <label className="product-detail-page__option-label">Quantity:</label>
            <div className="product-detail-page__quantity-controls">
              <button
                className="product-detail-page__quantity-btn"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                <Minus className="product-detail-page__quantity-icon" />
              </button>
              <input
                type="number"
                className="product-detail-page__quantity-input"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button
                className="product-detail-page__quantity-btn"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                <Plus className="product-detail-page__quantity-icon" />
              </button>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          className="btn btn--primary product-detail-page__add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={(product.sizes.length > 0 && product.sizes[0] !== 'N/A' && !selectedSize) || (product.colors.length > 0 && !selectedColor)}
        >
          Add to Cart
        </button>

        {/* Add to Cart Message Display */}
        {addToCartMessage && (
          <div className="product-detail-page__message product-detail-page__message--success">
            {addToCartMessage}
          </div>
        )}
      </div>

      {/* Product Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="product-detail-page__reviews">
          <h2 className="product-detail-page__reviews-heading">Customer Reviews</h2>
          <div className="product-detail-page__review-list">
            {product.reviews.map(review => (
              <div key={review.id} className="product-detail-page__review-item">
                <div className="product-detail-page__review-header">
                  <span className="product-detail-page__review-author">{review.author}</span>
                  <span className="product-detail-page__review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="product-detail-page__review-comment">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
