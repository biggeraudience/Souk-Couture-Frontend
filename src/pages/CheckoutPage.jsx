// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_checkout-page.scss';

const CheckoutPage = ({ cartItems, total, clearAllItems }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: Info, 2: Payment, 3: Review

  // State for Customer Information
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    deliveryMethod: 'standard', // 'standard' or 'express'
    deliveryNotes: '',
  });

  // State for Payment Information
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  // Progress bar steps
  const steps = [
    { id: 1, name: 'Information & Delivery' },
    { id: 2, name: 'Payment' },
    { id: 3, name: 'Review Order' },
  ];

  // Handle input changes for forms
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Navigation functions
  const nextStep = () => {
    // Basic validation before moving to the next step
    if (currentStep === 1) {
      const { fullName, email, phone, address, city, state, zip } = customerInfo;
      if (!fullName || !email || !phone || !address || !city || !state || !zip) {
        alert('Please fill in all required customer and delivery information.');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
    } else if (currentStep === 2) {
      const { cardNumber, expiryDate, cvv, cardName } = paymentInfo;
      if (!cardNumber || !expiryDate || !cvv || !cardName) {
        alert('Please fill in all required payment information.');
        return;
      }
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY).');
        return;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        alert('Please enter a valid 3 or 4 digit CVV.');
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      navigate('/products');
      return;
    }
    // Simulate order placement
    alert('Order Placed Successfully! (This is a placeholder action)');
    console.log('Order Details:', { customerInfo, paymentInfo, cartItems, total });
    clearAllItems(); // Clear cart after successful order
    navigate('/order-confirmation'); // Navigate to a confirmation page
  };

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <section className="checkout-page checkout-page--empty">
        <h1 className="checkout-page__title">Checkout</h1>
        <div className="checkout-page__empty-cart">
          <p>Your cart is empty. Please add items to proceed to checkout.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Go to Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h1 className="checkout-page__title">Checkout</h1>

      {/* Progress Bar */}
      <div className="progress-bar">
        {steps.map((step) => (
          <div key={step.id} className={`progress-bar__step ${currentStep === step.id ? 'progress-bar__step--active' : ''} ${currentStep > step.id ? 'progress-bar__step--completed' : ''}`}>
            <div className="progress-bar__circle">{step.id}</div>
            <div className="progress-bar__label">{step.name}</div>
          </div>
        ))}
        <div className="progress-bar__line">
          <div className="progress-bar__fill" style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}></div>
        </div>
      </div>

      {/* Step 1: Customer Information & Delivery */}
      {currentStep === 1 && (
        <div className="checkout-step">
          <h2 className="checkout-step__title">1. Customer Information & Delivery</h2>
          {/* ADD THIS CLASS: checkout-form--customer-info */}
          <form className="checkout-form checkout-form--customer-info">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={customerInfo.fullName}
                onChange={handleCustomerInfoChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State / Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={customerInfo.state}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip / Postal Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={customerInfo.zip}
                  onChange={handleCustomerInfoChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="deliveryMethod">Delivery Method</label>
              <select
                id="deliveryMethod"
                name="deliveryMethod"
                value={customerInfo.deliveryMethod}
                onChange={handleCustomerInfoChange}
              >
                <option value="standard">Standard Shipping (3-5 business days)</option>
                <option value="express">Express Shipping (1-2 business days) - +$15.00</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="deliveryNotes">Delivery Notes (Optional)</label>
              <textarea
                id="deliveryNotes"
                name="deliveryNotes"
                value={customerInfo.deliveryNotes}
                onChange={handleCustomerInfoChange}
                rows="3"
              ></textarea>
            </div>
            <div className="checkout-actions">
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Payment */}
      {currentStep === 2 && (
        <div className="checkout-step">
          <h2 className="checkout-step__title">2. Payment Information</h2>
          <form className="checkout-form"> {/* This form remains with the default checkout-form styles */}
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                onChange={handlePaymentInfoChange}
                maxLength="19" // 16 digits + 3 spaces
                placeholder="XXXX XXXX XXXX XXXX"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentInfoChange}
                  maxLength="5" // MM/YY
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentInfoChange}
                  maxLength="4"
                  placeholder="XXX"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Name on Card</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={paymentInfo.cardName}
                onChange={handlePaymentInfoChange}
                required
              />
            </div>
            <div className="checkout-actions">
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                Back to Information
              </button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Review Order
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Order Review */}
      {currentStep === 3 && (
        <div className="checkout-step">
          <h2 className="checkout-step__title">3. Review Your Order</h2>

          <div className="order-summary">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {customerInfo.fullName}</p>
            <p><strong>Email:</strong> {customerInfo.email}</p>
            <p><strong>Phone:</strong> {customerInfo.phone}</p>
            <p><strong>Address:</strong> {customerInfo.address}, {customerInfo.city}, {customerInfo.state}, {customerInfo.zip}</p>
            <p><strong>Delivery Method:</strong> {customerInfo.deliveryMethod === 'standard' ? 'Standard Shipping' : 'Express Shipping'}</p>
            {customerInfo.deliveryNotes && <p><strong>Delivery Notes:</strong> {customerInfo.deliveryNotes}</p>}

            <h3>Payment Details</h3>
            <p><strong>Card Number:</strong> **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
            <p><strong>Expiry Date:</strong> {paymentInfo.expiryDate}</p>
            <p><strong>Name on Card:</strong> {paymentInfo.cardName}</p>

            <h3>Order Items</h3>
            {cartItems.length > 0 ? (
              <ul className="order-items-list">
                {cartItems.map((item) => (
                  <li key={`${item.id}-${item.selectedSize}-${item.selectedColors.join('-')}`} className="order-item">
                    <img src={item.images?.[0] || 'https://via.placeholder.com/50'} alt={item.name} className="order-item__image" />
                    <div className="order-item__details">
                      <span className="order-item__name">{item.name}</span>
                      <span className="order-item__options">Size: {item.selectedSize}, Color: {item.selectedColors.join(', ')}</span>
                      <span className="order-item__quantity">Qty: {item.quantity}</span>
                      <span className="order-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items in cart to review.</p>
            )}

            <div className="order-total">
              <span>Order Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="checkout-actions">
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Back to Payment
            </button>
            <button type="button" className="btn btn-primary" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;