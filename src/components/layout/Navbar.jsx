import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../forms/FormField';
import PropTypes from 'prop-types';

const Navbar = ({ isSidebarOpen, toggleSidebar, cartItemCount, onBagIconClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // In a real app, navigate to search results page: navigate(`/search?q=${searchTerm}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar__section navbar__left">
        <div
          className="navbar__hamburger-icon"
          onClick={toggleSidebar}
          style={{ cursor: 'pointer' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" fill="#000"><path d="M120-693.33V-760h720v66.67H120ZM120-200v-66.67h720V-200H120Zm0-246.67v-66.66h720v66.66H120Z"/></svg>
        </div>
      </div>

      <div className="navbar__section navbar__middle">
        <Link to="/" className="navbar__logo">
          Souk Couture
        </Link>
        <form className="navbar__search-container" onSubmit={handleSearchSubmit}>
          <FormField
            type="text"
            name="search"
            placeholder="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
      </div>

      <div className="navbar__section navbar__right">
        {/* Shopping Cart Icon with click handler and item count */}
        <div className="navbar__icon navbar__bag-icon" onClick={onBagIconClick} style={{ cursor: 'pointer', position: 'relative' }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" fill="#000">
            <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/>
          </svg>
          {cartItemCount > 0 && (
            <span className="cart-item-count">{cartItemCount}</span>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  cartItemCount: PropTypes.number.isRequired, // Add prop type for cartItemCount
  onBagIconClick: PropTypes.func.isRequired, // Add prop type for onBagIconClick
};

export default Navbar;