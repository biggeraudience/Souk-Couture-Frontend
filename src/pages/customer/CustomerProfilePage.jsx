// src/pages/customer/CustomerProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/pages/customer/_customer-profile.scss';

const CustomerProfilePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Mock user data (replace with actual data fetched from backend)
  const [userData, setUserData] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '234-801-234-5678',
    gender: 'Female',
    dateOfBirth: '1990-01-15',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize form data with current user data when component mounts or userData changes
    setFormData(userData);
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMessage('');
    setError('');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(userData); // Reset form data to original user data
    setMessage('');
    setError('');
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('First Name, Last Name, and Email are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Simulate API call to update profile
      // In a real application, you would send formData to your backend
      console.log('Saving profile data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

      setUserData(formData); // Update global user data state
      setIsEditing(false);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    }
  };

  // New function to handle icon clicks for navigation
  const handleNavigationClick = (path) => {
    navigate(`/customer/${path}`);
  };

  return (
    <div className="customer-profile-page">
      {/* New: Navigation Icons at the top */}
      <div className="customer-profile-page__nav-icons">
        <div className="nav-icon-item" onClick={() => handleNavigationClick('profile')}>
          <span className="icon">👤</span> {/* Profile Icon */}
          <span className="text">Profile</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('orders')}>
          <span className="icon">📦</span> {/* Orders Icon */}
          <span className="text">Orders</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('favorites')}>
          <span className="icon">❤️</span> {/* Favorites Icon */}
          <span className="text">Favorites</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('addresses')}>
          <span className="icon">🏠</span> {/* Address Book Icon */}
          <span className="text">Addresses</span>
        </div>
        <div className="nav-icon-item" onClick={() => handleNavigationClick('messages')}>
          <span className="icon">✉️</span> {/* Messages Icon */}
          <span className="text">Messages</span>
        </div>
      </div>

      <h1 className="customer-profile-page__title">My Profile</h1>

      {message && <div className="customer-profile-page__message customer-profile-page__message--success">{message}</div>}
      {error && <div className="customer-profile-page__message customer-profile-page__message--error">{error}</div>}

      <form onSubmit={handleSaveClick} className="customer-profile-page__form">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-input"
            value={formData.firstName || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-input"
            value={formData.lastName || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={formData.phone || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-select"
            value={formData.gender || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="form-input"
            value={formData.dateOfBirth || ''}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="customer-profile-page__actions">
          {isEditing ? (
            <>
              <button type="submit" className="btn">Save Changes</button>
              <button type="button" className="btn btn--inactive" onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <button type="button" className="btn" onClick={handleEditClick}>Edit Profile</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerProfilePage;