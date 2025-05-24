// src/pages/auth/ForgotPasswordPage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useLocation, Link } from 'react-router-dom'; // Import useLocation, Link
import axiosInstance from '../../utils/axiosInstance'; // Assuming you'll use this for API call
import '../../styles/pages/_auth.scss';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  // Determine if this is an admin forgot password flow
  const isAdminFlow = location.pathname.includes('/admin-portal/forgot-password');

  // Dynamically set page title and API endpoint
  const pageTitle = isAdminFlow ? 'Admin Forgot Password' : 'Forgot Password';
  const apiEndpoint = isAdminFlow ? '/api/auth/admin-portal-forgot-password' : '/api/auth/forgot-password';

  // Clear form and messages on path change
  useEffect(() => {
    setEmail('');
    setMessage('');
    setError('');
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // TODO: Implement actual forgot password logic on backend
      // For now, it's just a placeholder API call
      const response = await axiosInstance.post(apiEndpoint, { email });
      setMessage(response.data.message || 'Password reset link sent (if email exists).');
      console.log(`${pageTitle} request for:`, email);

    } catch (err) {
      console.error(`${pageTitle} error:`, err);
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{pageTitle}</h2>
        <p className="auth-card__description">
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full-width">Send Reset Link</button>
        </form>
        {/* Conditional links based on flow */}
        {isAdminFlow ? (
          <p className="auth-card__link-text">
            <Link to="/admin-portal/login">Back to Admin Login</Link>
          </p>
        ) : (
          <p className="auth-card__link-text">
            <Link to="/login">Back to Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;