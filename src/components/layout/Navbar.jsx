// src/components/layout/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../forms/FormField';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real app, navigate to search results page: navigate(`/search?q=${searchTerm}`);
  };

  // Function to toggle the menu state
  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Menu is now:', !isMenuOpen ? 'Open' : 'Closed');
    // Here you would also add logic to actually open/close a side menu or modal
  };

  return (
    <nav className="navbar">
      {/* Left Section: Hamburger/Close Icon */}
      <div className="navbar__section navbar__left">
        <div
          className="navbar__hamburger-icon"
          onClick={handleHamburgerClick} // Add onClick handler
          style={{ cursor: 'pointer' }} // Add cursor pointer for better UX
        >
          {/* Conditionally render hamburger or close icon */}
          {isMenuOpen ? (
            // Close icon (an 'X') - NO width/height attributes
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" fill="#000"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/></svg>
          ) : (
            // Hamburger icon - NO width/height attributes
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" fill="#000"><path d="M120-693.33V-760h720v66.67H120ZM120-200v-66.67h720V-200H120Zm0-246.67v-66.66h720v66.66H120Z"/></svg>
          )}
        </div>
      </div>

      {/* Middle Section: Logo and Search Bar */}
      {/* This section will now have a left border to act as the first divider */}
      <div className="navbar__section navbar__middle">
        <Link to="/" className="navbar__logo">
          Souk Couture
        </Link>
        <form className="navbar__search-container" onSubmit={handleSearchSubmit}>
          <FormField
            type="text"
            name="search"
            placeholder="search" // Your placeholder text
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      {/* Right Section: Three Icons */}
      {/* This section will now have a left border to act as the second divider */}
      <div className="navbar__section navbar__right">
        {/* User/Account Icon */}
        <div className="navbar__icon">
          {/* NO width/height attributes */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000">
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
          </svg>
        </div>
        {/* Wishlist/Favorites Icon */}
        <div className="navbar__icon">
          {/* NO width/height attributes */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000">
            <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
          </svg>
        </div>
        {/* Shopping Cart Icon */}
        <div className="navbar__icon">
          {/* NO width/height attributes */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#000">
            <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;