import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/_customer-order-card.scss';

const CustomerOrderCard = ({ order }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'customer-order-card__status--delivered';
      case 'processing':
        return 'customer-order-card__status--processing';
      case 'cancelled':
        return 'customer-order-card__status--cancelled';
      case 'shipped':
        return 'customer-order-card__status--shipped';
      default:
        return '';
    }
  };

  return (
    <div className="customer-order-card">
      <div className="customer-order-card__header">
        <h3 className="customer-order-card__id">Order ID: {order.id}</h3>
        <span className={`customer-order-card__status ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </div>
      <div className="customer-order-card__details">
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>
      <div className="customer-order-card__items">
        {order.items.slice(0, 2).map(item => ( // Show first 2 items
          <div key={item.id} className="customer-order-card__item-preview">
            <img src={item.imageUrl} alt={item.name} className="customer-order-card__item-image" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/E0E0E0/A0A0A0?text=N/A" }} />
            <span className="customer-order-card__item-name">{item.name} ({item.quantity})</span>
          </div>
        ))}
        {order.items.length > 2 && (
          <span className="customer-order-card__more-items">
            +{order.items.length - 2} more items
          </span>
        )}
      </div>
      <div className="customer-order-card__actions">
        <Link to={`/customer/orders/${order.id}`} className="btn btn--small">
          View Details
        </Link>
        {/* Add reorder or track button if applicable */}
        {order.status === 'Delivered' && (
          <button className="btn btn--small btn--inactive">Reorder</button>
        )}
      </div>
    </div>
  );
};

export default CustomerOrderCard;
