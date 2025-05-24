// src/pages/auth/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/pages/_auth.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminFlow = location.pathname.includes('/admin-portal/login');

  const pageTitle = isAdminFlow ? 'Admin Login' : 'Login';
  const apiEndpoint = isAdminFlow ? '/api/auth/admin-portal-login' : '/api/auth/login';
  // **UPDATED LINE HERE**
  const successRedirectPath = isAdminFlow ? '/admin/dashboard' : '/customer/profile'; // Redirect customer to profile
                                                                        // ^^^^^^^^^^^^^^^

  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post(apiEndpoint, {
        email,
        password,
      });

      console.log(`${pageTitle} successful:`, response.data);

      // TODO: Handle token/user data storage.
      navigate(successRedirectPath);

    } catch (err) {
      console.error(`${pageTitle} error:`, err);
      setError(err.response?.data?.message || `${pageTitle} failed. Please check your credentials.`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{pageTitle}</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
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
          <button type="submit" className="btn btn-primary btn-full-width">{pageTitle}</button>
        </form>
        {isAdminFlow ? (
          <>
            <p className="auth-card__link-text">
              New admin? <Link to="/admin-portal/register">Register here</Link>
            </p>
            <p className="auth-card__link-text">
              <Link to="/admin-portal/forgot-password">Forgot Admin Password?</Link>
            </p>
            <p className="auth-card__link-text">
              <Link to="/login">Are you a customer? Log in here</Link>
            </p>
          </>
        ) : (
          <>
            <p className="auth-card__link-text">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
            <p className="auth-card__link-text">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p className="auth-card__link-text">
              <Link to="/admin-portal/login">Are you an administrator? Log in here</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;