import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../styles/pages/customer/_customer-order-detail.scss'; // NEW SCSS file

const mockOrders = [
  {
    id: 'ORD001',
    date: '2025-05-10',
    total: 120.00,
    status: 'Delivered',
    shippingAddress: {
      name: 'Jane Doe',
      street: '123 Fashion Ave',
      city: 'Style City',
      state: 'ST',
      zip: '10001',
      country: 'USA',
    },
    billingAddress: {
      name: 'Jane Doe',
      street: '123 Fashion Ave',
      city: 'Style City',
      state: 'ST',
      zip: '10001',
      country: 'USA',
    },
    paymentMethod: 'Credit Card (**** 1234)',
    items: [
      { id: 'prod1', name: 'Summer Dress', quantity: 1, price: 75.00, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Dress', size: 'M', color: 'Blue' },
      { id: 'prod2', name: 'Leather Sandals', quantity: 1, price: 45.00, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Sandals', size: '7', color: 'Black' },
    ],
    shippingCost: 5.00,
    tax: 10.00,
  },
  {
    id: 'ORD002',
    date: '2025-04-22',
    total: 85.50,
    status: 'Processing',
    shippingAddress: {
      name: 'John Smith',
      street: '456 Trend St',
      city: 'Chic Town',
      state: 'CT',
      zip: '20002',
      country: 'USA',
    },
    billingAddress: {
      name: 'John Smith',
      street: '456 Trend St',
      city: 'Chic Town',
      state: 'CT',
      zip: '20002',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    items: [
      { id: 'prod3', name: 'Graphic Tee', quantity: 2, price: 25.00, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Tee', size: 'L', color: 'White' },
      { id: 'prod4', name: 'Denim Jeans', quantity: 1, price: 35.50, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Jeans', size: '32', color: 'Indigo' },
    ],
    shippingCost: 7.50,
    tax: 5.00,
  },
];

const CustomerOrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call to fetch a single order by ID
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundOrder = mockOrders.find(o => o.id === orderId);
        if (foundOrder) {
          setOrder(foundOrder);
          setError('');
        } else {
          setError('Order not found.');
        }
      } catch (err) {
        setError('Failed to load order details. Please try again.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="customer-order-detail-page"><p className="text-center">Loading order details...</p></div>;
  }

  if (error) {
    return <div className="customer-order-detail-page"><p className="text-center text-error">{error}</p></div>;
  }

  if (!order) {
    return <div className="customer-order-detail-page"><p className="text-center">Order details could not be loaded.</p></div>;
  }

  return (
    <div className="customer-order-detail-page">
      <div className="customer-order-detail-page__header">
        <Link to="/customer/orders" className="btn btn--small">← Back to Orders</Link>
        <h1 className="customer-order-detail-page__title">Order Details: {order.id}</h1>
      </div>

      <div className="customer-order-detail-page__summary">
        <p><strong>Order Date:</strong> {order.date}</p>
        <p><strong>Status:</strong> <span className={`status-badge status-badge--${order.status.toLowerCase()}`}>{order.status}</span></p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
      </div>

      <div className="customer-order-detail-page__sections">
        <section className="customer-order-detail-page__section">
          <h2 className="customer-order-detail-page__section-title">Shipping Address</h2>
          <address>
            {order.shippingAddress.name}<br />
            {order.shippingAddress.street}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
            {order.shippingAddress.country}
          </address>
        </section>

        <section className="customer-order-detail-page__section">
          <h2 className="customer-order-detail-page__section-title">Billing Address</h2>
          <address>
            {order.billingAddress.name}<br />
            {order.billingAddress.street}<br />
            {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}<br />
            {order.billingAddress.country}
          </address>
        </section>
      </div>

      <section className="customer-order-detail-page__section customer-order-detail-page__section--full-width">
        <h2 className="customer-order-detail-page__section-title">Items in Order</h2>
        <div className="customer-order-detail-page__items-list">
          {order.items.map(item => (
            <div key={item.id} className="customer-order-detail-page__item">
              <img src={item.imageUrl} alt={item.name} className="customer-order-detail-page__item-image" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/E0E0E0/A0A0A0?text=N/A" }} />
              <div className="customer-order-detail-page__item-info">
                <p className="customer-order-detail-page__item-name">{item.name}</p>
                <p className="customer-order-detail-page__item-details">
                  Quantity: {item.quantity} | Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}
                </p>
              </div>
              <p className="customer-order-detail-page__item-price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="customer-order-detail-page__totals">
        <p>Subtotal: <span>${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span></p>
        <p>Shipping: <span>${order.shippingCost.toFixed(2)}</span></p>
        <p>Tax: <span>${order.tax.toFixed(2)}</span></p>
        <p className="customer-order-detail-page__grand-total">Grand Total: <span>${order.total.toFixed(2)}</span></p>
      </div>

      <div className="customer-order-detail-page__actions">
        {order.status === 'Delivered' && (
          <button className="btn">Request Return</button>
        )}
        {order.status === 'Processing' && (
          <button className="btn btn--inactive">Cancel Order</button>
        )}
        <button className="btn">Contact Support for this Order</button>
      </div>
    </div>
  );
};

export default CustomerOrderDetailPage;
