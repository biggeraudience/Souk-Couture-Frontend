import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_cart.scss';

const Cart = ({ cartItems, favorites, updateQuantity, removeItem, addItemToCart, removeFavorite, clearAllItems, total }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (item, newQuantity) => {
    updateQuantity(item.id, item.selectedSize, item.selectedColors, newQuantity);
  };

  const handleRemoveItem = (idToRemove) => {
    removeItem(idToRemove);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearAllItems();
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout! (This is a placeholder action)');
    // In a real application, you would navigate to a checkout page
    // navigate('/checkout');
  };

  const handleAddToFavoritesAndCart = (favItem) => {
    // Add to cart logic (assuming default size/color if not specified, or prompt user)
    addItemToCart({
      id: favItem.id,
      name: favItem.name,
      images: favItem.images,
      price: favItem.price,
      selectedSize: favItem.sizes?.[0] || 'M', // Default or prompt
      selectedColors: favItem.colors?.[0] ? [favItem.colors[0]] : ['Black'], // Default or prompt
      quantity: 1,
      isBespoke: false,
    });
    alert(`${favItem.name} added to cart from favorites!`);
  };

  return (
    <section className="cart-page">
      <h1 className="cart-page__title">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-page__empty">
          <p>Your cart is currently empty.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="cart-page__content">
          <div className="cart-page__items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColors.join('-')}`} className="cart-item">
                <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.name} className="cart-item__image" />
                <div className="cart-item__details">
                  <h3 className="cart-item__name">{item.name}</h3>
                  <p className="cart-item__options">
                    Size: <strong>{item.selectedSize}</strong> | Color: <strong>{item.selectedColors.join(', ')}</strong>
                  </p>
                  <p className="cart-item__price">${item.price.toFixed(2)}</p>
                  <div className="cart-item__quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item, e.target.value)}
                      min="1"
                      className="quantity-input"
                      aria-label={`Quantity for ${item.name}`}
                    />
                    <button className="quantity-btn" onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <button className="cart-item__remove-btn" onClick={() => handleRemoveItem(item.id)} aria-label={`Remove ${item.name} from cart`}>
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="cart-page__summary">
            <h2 className="cart-page__summary-title">Order Summary</h2>
            <div className="cart-page__summary-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-page__summary-row">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="cart-page__summary-row cart-page__summary-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary btn--full-width" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="btn btn-secondary btn--full-width mt-s" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <>
          <h2 className="cart-page__favorites-title">Your Bookmarked Items</h2>
          <div className="cart-page__favorites">
            {favorites.map((fav) => (
              <div key={fav.id} className="favorite-item">
                <img src={fav.images?.[0] || 'https://via.placeholder.com/80'} alt={fav.name} className="favorite-item__image" />
                <div className="favorite-item__details">
                  <h4 className="favorite-item__name">{fav.name}</h4>
                  <p className="favorite-item__price">${fav.price.toFixed(2)}</p>
                  <div className="favorite-item__actions">
                    <button className="btn btn-primary btn--small" onClick={() => handleAddToFavoritesAndCart(fav)}>
                      Add to Cart
                    </button>
                    <button className="btn btn-text-danger btn--small" onClick={() => removeFavorite(fav.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;