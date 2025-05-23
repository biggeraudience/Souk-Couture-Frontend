import React from "react"; // No need for useState if no local state like activeTab
import "../styles/pages/_cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, favorites, updateQuantity, removeItem, addItemToCart, removeFavorite, clearAllItems, total }) => {

  return (
    <>
      {/* Navbar and Footer are now handled in App.jsx */}
      <div className="cart-page">
        <div className="cart-container">
          {/* Directly display the bag section */}
          <div className="bag-section">
            <div className="empty-bag">
              {cartItems.length === 0 ? (
                <p>Your bag is empty.</p>
              ) : (
                <>
                  <p>Your Items</p>
                  <button
                    className="clear-all-btn"
                    onClick={clearAllItems}
                  >
                    Clear All
                  </button>
                </>
              )}
            </div>
            <div className="products-grid">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${(item.selectedColors || []).join(",")}`}
                  className="product-card"
                >
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/150?text=NoImage"}
                    alt={item.name}
                  />
                  <div className="product-name">
                    {item.isBespoke && (
                      <span className="bespoke-icon" title="Custom Bespoke Order">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#000"
                        >
                          <path d="m240-522-40 22q-14 8-30 4t-24-18L66-654q-8-14-4-30t18-24l230-132h70q9 0 14.5 5.5T400-820v20q0 33 23.5 56.5T480-720q33 0 56.5-23.5T560-800v-20q0-9 5.5-14.5T580-840h70l230 132q14 8 18 24t-4 30l-80 140q-8 14-23.5 17.5T760-501l-40-20v361q0 17-11.5 28.5T680-120H280q-17 0-28.5-11.5T240-160v-362Z" />
                        </svg>
                      </span>
                    )}
                    <span>{item.name}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      X
                    </button>
                  </div>
                  <div className="product-details">
                    {item.selectedColors && item.selectedColors.length > 0 ? (
                      <span>Color: {item.selectedColors.join(", ")}</span>
                    ) : (
                      <span>No color selected</span>
                    )}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    <div className="quantity-selector">
                      <button
                        className="decrement-btn"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColors,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColors,
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="increment-btn"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.selectedSize,
                            item.selectedColors,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>


            <div className="pay-section">
              <p className="terms">
                {cartItems.length > 0
                  ? "*By continuing, I declare that I have read and accept the Purchase Conditions and understand Haya Fashion LLC Privacy and Cookie Policy."
                  : "Read T&C"}
              </p>
              <div className="total">
                <span>Total: ${total.toFixed(2)}</span>
                <button
                  className="pay-btn"
                  onClick={() => navigate("/checkout")}
                  disabled={cartItems.length === 0} // Disable if cart is empty
                >
                  PAY
                </button>
              </div>
            </div>
          </div>

          {/* Favorites Section - You might want to move this to a separate page or a different part of the cart */}
          <div className="favorites-section">
            <h3>Your Favorites</h3>
            {favorites.length === 0 ? (
              <div className="empty-favorites">
                <p>No Favorites Yet</p>
              </div>
            ) : (
              <div className="products-grid favorites-grid">
                {favorites.map((item) => (
                  <div key={item.id} className="favorite-card">
                    <img
                      src={item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/150?text=NoImage"}
                      alt={item.name}
                    />
                    <div className="favorite-details">
                      <span>{item.name}</span>
                      <span>Price: ${item.price.toFixed(2)}</span>
                      <button
                        className="buy-btn"
                        onClick={() => {
                          addItemToCart({ ...item, quantity: 1, selectedSize: item.selectedSize || null, selectedColors: item.selectedColors || [] });
                          removeFavorite(item.id);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="remove-fav-btn"
                        onClick={() => removeFavorite(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;