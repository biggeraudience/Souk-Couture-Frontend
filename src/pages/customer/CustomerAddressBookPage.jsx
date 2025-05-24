import React, { useState, useEffect } from 'react';
import CustomerAddressCard from '../../components/customer/CustomerAddressCard'; // NEW Component
import '../../styles/pages/customer/_customer-address-book.scss'; // NEW SCSS file

const mockAddresses = [
  {
    id: 'addr1',
    name: 'Home Address',
    recipient: 'Jane Doe',
    street: '123 Fashion Ave',
    city: 'Style City',
    state: 'ST',
    zip: '10001',
    country: 'USA',
    phone: '234-555-1234',
    isDefault: true,
  },
  {
    id: 'addr2',
    name: 'Work Address',
    recipient: 'Jane Doe',
    street: '456 Office Tower',
    city: 'Biz Town',
    state: 'BT',
    zip: '20002',
    country: 'USA',
    phone: '234-555-5678',
    isDefault: false,
  },
];

const CustomerAddressBookPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // Null for new, object for edit

  const [formData, setFormData] = useState({
    name: '', recipient: '', street: '', city: '', state: '', zip: '', country: '', phone: '', isDefault: false
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setAddresses(mockAddresses); // Replace with actual fetch from backend
        setError('');
      } catch (err) {
        setError('Failed to load addresses. Please try again.');
        console.error('Error fetching addresses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleAddAddressClick = () => {
    setEditingAddress(null); // Clear any editing state
    setFormData({ name: '', recipient: '', street: '', city: '', state: '', zip: '', country: '', phone: '', isDefault: false });
    setShowAddressForm(true);
  };

  const handleEditAddressClick = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id) => {
    // Implement confirmation modal instead of alert in real app
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        // Simulate API call to delete address
        await new Promise(resolve => setTimeout(resolve, 500));
        setAddresses(prev => prev.filter(addr => addr.id !== id));
        alert('Address deleted successfully!');
      } catch (err) {
        alert('Failed to delete address.');
        console.error('Delete address error:', err);
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      // Simulate API call to set default
      await new Promise(resolve => setTimeout(resolve, 500));
      setAddresses(prev => prev.map(addr =>
        addr.id === id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
      ));
      alert('Default address updated!');
    } catch (err) {
      alert('Failed to set default address.');
      console.error('Set default error:', err);
    }
  };

  const handleSubmitAddressForm = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.recipient || !formData.street || !formData.city || !formData.zip) {
      setError('Recipient, Street, City, and Zip are required.');
      return;
    }

    try {
      if (editingAddress) {
        // Update existing address
        await new Promise(resolve => setTimeout(resolve, 800));
        setAddresses(prev => prev.map(addr =>
          addr.id === editingAddress.id ? { ...formData, id: editingAddress.id } : addr
        ));
        alert('Address updated successfully!');
      } else {
        // Add new address
        const newId = `addr${Date.now()}`;
        await new Promise(resolve => setTimeout(resolve, 800));
        setAddresses(prev => [...prev, { ...formData, id: newId }]);
        alert('Address added successfully!');
      }
      setShowAddressForm(false);
      setEditingAddress(null);
      setFormData({ name: '', recipient: '', street: '', city: '', state: '', zip: '', country: '', phone: '', isDefault: false });
    } catch (err) {
      setError('Failed to save address. Please try again.');
      console.error('Save address error:', err);
    }
  };

  if (loading) {
    return <div className="customer-address-book-page"><p className="text-center">Loading addresses...</p></div>;
  }

  if (error) {
    return <div className="customer-address-book-page"><p className="text-center text-error">{error}</p></div>;
  }

  return (
    <div className="customer-address-book-page">
      <div className="customer-address-book-page__header">
        <h1 className="customer-address-book-page__title">Address Book</h1>
        <button className="btn" onClick={handleAddAddressClick}>
          Add New Address
        </button>
      </div>

      {showAddressForm && (
        <div className="customer-address-book-page__form-container">
          <h2>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
          {error && <div className="customer-profile-page__message customer-profile-page__message--error">{error}</div>}
          <form onSubmit={handleSubmitAddressForm}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Address Label (e.g., Home, Work)</label>
              <input type="text" id="name" name="name" className="form-input" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="recipient" className="form-label">Recipient Name</label>
              <input type="text" id="recipient" name="recipient" className="form-input" value={formData.recipient} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="street" className="form-label">Street Address</label>
              <input type="text" id="street" name="street" className="form-input" value={formData.street} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" id="city" name="city" className="form-input" value={formData.city} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="state" className="form-label">State/Province</label>
              <input type="text" id="state" name="state" className="form-input" value={formData.state} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="zip" className="form-label">Zip/Postal Code</label>
              <input type="text" id="zip" name="zip" className="form-input" value={formData.zip} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="country" className="form-label">Country</label>
              <input type="text" id="country" name="country" className="form-input" value={formData.country} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="form-input" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} />
              <label htmlFor="isDefault" className="form-label" style={{ display: 'inline-block', marginLeft: '0.8rem' }}>Set as Default</label>
            </div>
            <div className="customer-address-book-page__form-actions">
              <button type="submit" className="btn">{editingAddress ? 'Save Changes' : 'Add Address'}</button>
              <button type="button" className="btn btn--inactive" onClick={() => setShowAddressForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="customer-address-book-page__list">
        {addresses.length === 0 && !showAddressForm ? (
          <p className="customer-address-book-page__empty-message">No addresses saved yet. Add one to get started!</p>
        ) : (
          addresses.map(address => (
            <CustomerAddressCard
              key={address.id}
              address={address}
              onEdit={handleEditAddressClick}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerAddressBookPage;
