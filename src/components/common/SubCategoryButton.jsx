// src/components/common/SubCategoryButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/_subcategory-button.scss'; // New SCSS file for this button

const SubCategoryButton = ({ children, onClick, isDisabled = false, ...props }) => {
  return (
    <button
      className="subcategory-btn" // This specific class will control its unique styling
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

SubCategoryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default SubCategoryButton;