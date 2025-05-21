// src/components/layout/Footer.jsx
import React from 'react';
import '../../styles/layouts/_footer.scss'; // We'll create this SCSS file

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "Souk Couture"; // Your company name

  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {currentYear} {companyName}. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;