// src/components/customer/CustomerMessageCard.jsx
import React from 'react';
import '../../styles/components/_customer-message-card.scss';

const CustomerMessageCard = ({ message, onClick }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Open':
        return 'customer-message-card__status--open';
      case 'Closed':
        return 'customer-message-card__status--closed';
      case 'Awaiting Reply':
        return 'customer-message-card__status--awaiting-reply';
      default:
        return '';
    }
  };

  return (
    <div
      className={`customer-message-card ${message.unread ? 'unread' : ''}`}
      onClick={() => onClick(message.id)}
    >
      <div className="customer-message-card__header">
        <h3 className="customer-message-card__subject">{message.subject}</h3>
        <span className="customer-message-card__date">
          {new Date(message.lastMessageDate).toLocaleDateString()}
        </span>
      </div>
      <p className="customer-message-card__snippet">{message.lastMessageSnippet}</p>
      <span className={`customer-message-card__status ${getStatusClass(message.status)}`}>
        {message.status}
      </span>
    </div>
  );
};

export default CustomerMessageCard;