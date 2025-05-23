// src/components/layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar'; // Assuming Navbar is in the same layout folder
import Footer from './Footer'; // Assuming Footer is in the same layout folder

function Layout({ children }) {
  return (
    <div className="site-container"> {/* This container will use CSS Grid for overall layout */}
      <header className="site-header">
        <Navbar />
      </header>
      <main className="site-main">
        {children} {/* Dynamic page content will be rendered here */}
      </main>
      <footer className="site-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;