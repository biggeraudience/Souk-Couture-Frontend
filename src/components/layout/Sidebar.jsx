import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/_sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const DropdownArrowIcon = () => (
    <svg className="sidebar__icon sidebar__icon--dropdown" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor">
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
    </svg>
  );

  const Subcategories = () => (
    <ul className="sidebar__subcategory-list">
      <li><a href="#subcategory1" className="sidebar__subcategory-link">Subcategory 1</a></li>
      <li><a href="#subcategory2" className="sidebar__subcategory-link">Subcategory 2</a></li>
      <li><a href="#subcategory3" className="sidebar__subcategory-link">Subcategory 3</a></li>
      <li><a href="#subcategory4" className="sidebar__subcategory-link">Subcategory 4</a></li>
    </ul>
  );

  const categoriesWithoutDropdown = ['men', 'women'];

  // Map of action names to their SVG paths
  const actionIcons = {
    home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    account: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.67 0-5.33-1.34-5.33-4s2.67-4 5.33-4 5.33 1.34 5.33 4-2.66 4-5.33 4z" />,
    bag: <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h12v12z" />,
    favorite: <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />,
    feed: <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h10v2H7zm0 3h10v2H7z" />,
    track: <path d="M12 2c-4.97 0-9 4.03-9 9 0 3.32 1.83 6.26 4.5 7.72V22l3.5-2 3.5 2v-3.28c2.67-1.46 4.5-4.4 4.5-7.72 0-4.97-4.03-9-9-9zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />,
  };

  return (
    <nav className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-hidden={!isOpen}>
      <div className="sidebar__content">
        <div className="sidebar__header">
          <button className="sidebar__close-btn" onClick={toggleSidebar} aria-label="Close menu">
            <svg className="sidebar__icon sidebar__icon--close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            <span>CLOSE</span>
          </button>
        </div>
        <div className="sidebar__wrapper">
          <ul className="sidebar__nav-section">
            {['men', 'women', 'clothing', 'shoes', 'bags', 'accessories', 'fabrics', 'veils', 'caps'].map((category) => (
              <li key={category} className={`sidebar__nav-item ${openDropdown === category ? 'sidebar__nav-item--open' : ''}`}>
                {categoriesWithoutDropdown.includes(category) ? (
                  <a href={`#${category}`} className="sidebar__nav-link">
                    <span>{category.toUpperCase()}</span>
                  </a>
                ) : (
                  <button
                    className="sidebar__nav-link sidebar__nav-link--dropdown"
                    onClick={() => handleDropdownToggle(category)}
                    aria-expanded={openDropdown === category}
                    aria-controls={`${category}-dropdown`}
                  >
                    <span>{category.toUpperCase()}</span>
                    <DropdownArrowIcon />
                  </button>
                )}
                {!categoriesWithoutDropdown.includes(category) && (
                  <div id={`${category}-dropdown`} className="sidebar__dropdown-content">
                    {openDropdown === category && <Subcategories />}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <ul className="sidebar__action-section">
            {['home', 'account', 'bag', 'favorite', 'feed', 'track'].map((action) => (
              <li key={action}>
                <a href={`#${action}`} className="sidebar__action-link">
                  <span>{action.toUpperCase()}</span>
                </a>
                <div className="sidebar__action-icon-wrapper">
                  <svg className="sidebar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    {actionIcons[action]}
                  </svg>
                </div>
              </li>
            ))}
          </ul>

          <ul className="sidebar__settings-section">
            <li>
              <a href="#customise" className="sidebar__settings-link">
                <span>CUSTOMISE</span>
                <svg className="sidebar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.09-.75-1.7-.92L14.86 2.1c-.05-.25-.23-.45-.47-.5l-4-1c-.24-.05-.47.11-.53.35L9.17 6.44c-.61.17-1.18.52-1.7.92l-2.49-1c-.22-.09-.49-.01-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.09.75 1.7.92L9.13 21.9c.05.25.23.45.47.5l4 1c.24.05.47-.11.53-.35l.25-2.49c.61-.17 1.18-.52 1.7-.92l2.49 1c.22.09.49.01.61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#bespoke" className="sidebar__settings-link">
                <span>BESPOKE</span>
                <svg className="sidebar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#report" className="sidebar__settings-link">
                <span>REPORT</span>
                <svg className="sidebar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zm-4-6h-2V9h2v4z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#policy" className="sidebar__settings-link">
                <span>POLICY</span>
                <svg className="sidebar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#contact" className="sidebar__settings-link">
                <span>CONTACT</span>
                <svg className="sidebar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </li>
          </ul>

          <div className="sidebar__brand">SOUK COUTURE</div>
        </div>
        <div className="sidebar__right-section">
          {/* Added more content here to demonstrate scrolling */}
          <h3>Welcome to the Right Section!</h3>
          <p>This area can hold various dynamic content, advertisements, or quick links. It's now designed to be a distinct, scrollable container within your sidebar.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>This content will scroll independently if it overflows its designated height. This is useful for keeping the main navigation visible while allowing more detailed information to be explored.</p>
          <p>Remember that the overall sidebar scrollbar is hidden, so only this section will show one if its content is too long.</p>
          <p>More text for scrolling demonstration.</p>
          <p>Even more text for scrolling demonstration.</p>
          <p>And some final text to ensure it extends beyond the visible area.</p>
        </div>
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;