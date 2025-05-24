import React from 'react';
import '../../styles/components/_customer-address-card.scss';

const CustomerAddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  return (
    <div className={`customer-address-card ${address.isDefault ? 'customer-address-card--default' : ''}`}>
      <div className="customer-address-card__header">
        <h3 className="customer-address-card__name">{address.name || 'Unnamed Address'}</h3>
        {address.isDefault && (
          <span className="customer-address-card__default-badge">Default</span>
        )}
      </div>
      <address className="customer-address-card__details">
        {address.recipient}<br />
        {address.street}<br />
        {address.city}, {address.state} {address.zip}<br />
        {address.country}<br />
        {address.phone && <span>Phone: {address.phone}</span>}
      </address>
      <div className="customer-address-card__actions">
        <button className="btn btn--small" onClick={() => onEdit(address)}>Edit</button>
        {!address.isDefault && (
          <button className="btn btn--small btn--inactive" onClick={() => onDelete(address.id)}>Delete</button>
        )}
        {!address.isDefault && (
          <button className="btn btn--small" onClick={() => onSetDefault(address.id)}>Set as Default</button>
        )}
      </div>
    </div>
  );
};

export default CustomerAddressCard;
