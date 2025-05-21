import React, { useState } from 'react';
import Button from '../common/Button';
// You'll need a way to get an icon, e.g., Font Awesome or inline SVG
// For now, I'll use a placeholder text icon.
// import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Example if using react-icons

const ProductCard = ({ product }) => {
  const [isBookmarked, setIsBookmarked] = useState(false); // Example state for bookmark

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, dispatch Redux action to update user's bookmarks
  };

  const handleBuyNow = () => {
    console.log(`Buying now: ${product.name}`);
    // Implement buy now logic (e.g., direct to checkout)
  };

  const handleAddToCart = () => {
    console.log(`Adding to cart: ${product.name}`);
    // Implement add to cart logic (e.g., dispatch Redux action)
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={product.imageUrl || 'https://placehold.co/400x400/E0E0E0/505050?text=Product+Image'}
          alt={product.name}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/E0E0E0/505050?text=Image+Error'; }}
        />
      </div>
      <div className="product-card__info">
        <div className="product-card__header">
          <h3 className="product-card__name">{product.name || 'Product Name'}</h3>
          <button
            className={`product-card__bookmark-btn ${isBookmarked ? 'product-card__bookmark-btn--active' : ''}`}
            onClick={handleBookmarkToggle}
            aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            {/* Placeholder for icon. Replace with actual icon component */}
            {isBookmarked ? '❤️' : '🤍'} {/* Example: filled heart vs. empty heart */}
          </button>
        </div>
        <p className="product-card__price">${(product.price || 0).toFixed(2)}</p>
        <div className="product-card__actions">
          <Button onClick={handleBuyNow} variant="primary" size="small">BUY</Button>
          <Button onClick={handleAddToCart} variant="secondary" size="small">ADD TO CART</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;