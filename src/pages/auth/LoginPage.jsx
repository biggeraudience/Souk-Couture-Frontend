// src/pages/auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from '../../utils/axiosInstance'; // Import your Axios instance
import '../../styles/pages/_auth.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      // Assuming your backend sends back a success message or user data on successful login
      console.log('Login successful:', response.data);

      // TODO: In a real application, you would store authentication tokens (e.g., JWT)
      // and/or user roles in localStorage, sessionStorage, or a global state management system (Redux, Context API).
      // For this example, we're simply redirecting.
      
      // Redirect to the admin dashboard
      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      // Display a user-friendly error message
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
          <button type="submit" className="btn btn-primary btn-full-width">Login</button>
        </form>
        <p className="auth-card__link-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
        <p className="auth-card__link-text">
          <a href="/forgot-password">Forgot Password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;