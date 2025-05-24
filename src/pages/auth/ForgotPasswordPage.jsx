import React, { useState } from 'react';
import '../../styles/pages/_auth.scss';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password request for:', email);
    // TODO: Implement actual forgot password logic
    alert('Forgot password functionality to be implemented!');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-card__description">
          Enter your email address to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
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
        <p className="auth-card__link-text">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;