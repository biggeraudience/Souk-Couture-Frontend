// src/pages/auth/RegisterPage.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import useLocation, Link
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/pages/_auth.scss';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get current location object

  // Determine if this is an admin registration flow
  const isAdminFlow = location.pathname.includes('/admin-portal/register');

  // Dynamically set page title and API endpoint
  const pageTitle = isAdminFlow ? 'Admin Registration' : 'Register';
  const apiEndpoint = isAdminFlow ? '/api/auth/admin-portal-register' : '/api/auth/register';
  const successRedirectPath = isAdminFlow ? '/admin/dashboard' : '/login'; // Redirect admin to dashboard, customer to login

  // Clear form on path change (e.g., if user navigates between /register and /admin-portal/register)
  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  }, [location.pathname]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axiosInstance.post(apiEndpoint, {
        name,
        email,
        password,
      });

      console.log(`${pageTitle} successful:`, response.data);

      // TODO: Handle token/user data storage (e.g., in Context/Redux)
      // For now, redirect.
      navigate(successRedirectPath);

    } catch (err) {
      console.error(`${pageTitle} error:`, err);
      setError(err.response?.data?.message || `${pageTitle} failed. Please try again.`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{pageTitle}</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full-width">{pageTitle}</button>
        </form>
        {/* Conditional links based on flow */}
        {isAdminFlow ? (
          <p className="auth-card__link-text">
            Already registered? <Link to="/admin-portal/login">Admin Login</Link>
          </p>
        ) : (
          <p className="auth-card__link-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;