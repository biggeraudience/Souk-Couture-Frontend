import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomerOrderCard from '../../components/customer/CustomerOrderCard'; // NEW Component
import '../../styles/pages/customer/_customer-orders.scss';

const mockOrders = [
  {
    id: 'ORD001',
    date: '2025-05-10',
    total: 120.00,
    status: 'Delivered',
    items: [
      { id: 'prod1', name: 'Summer Dress', quantity: 1, price: 75.00, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Dress' },
      { id: 'prod2', name: 'Leather Sandals', quantity: 1, price: 45.00, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Sandals' },
    ],
  },
  {
    id: 'ORD002',
    date: '2025-04-22',
    total: 85.50,
    status: 'Processing',
    items: [
      { id: 'prod3', name: 'Graphic Tee', quantity: 2, price: 25.00, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Tee' },
      { id: 'prod4', name: 'Denim Jeans', quantity: 1, price: 35.50, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Jeans' },
    ],
  },
  {
    id: 'ORD003',
    date: '2025-03-15',
    total: 200.00,
    status: 'Cancelled',
    items: [
      { id: 'prod5', name: 'Winter Coat', quantity: 1, price: 200.00, imageUrl: 'https://placehold.co/100x100/E0E0E0/A0A0A0?text=Coat' },
    ],
  },
];

const CustomerOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders); // Replace with actual fetch from backend
        setError('');
      } catch (err) {
        setError('Failed to load orders. Please try again.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="customer-orders-page"><p className="text-center">Loading orders...</p></div>;
  }

  if (error) {
    return <div className="customer-orders-page"><p className="text-center text-error">{error}</p></div>;
  }

  return (
    <div className="customer-orders-page">
      <h1 className="customer-orders-page__title">My Orders</h1>

      {orders.length === 0 ? (
        <p className="customer-orders-page__empty-message">You haven't placed any orders yet.</p>
      ) : (
        <div className="customer-orders-page__list">
          {orders.map(order => (
            <CustomerOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrdersPage;
