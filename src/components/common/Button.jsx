import React from 'react';
//import './_buttons.scss'; // If you want component-specific SCSS for complex buttons

const Button = ({ children, onClick, variant = '', size = '', isActive = false, isDisabled = false, ...props }) => {
  const buttonClasses = [
    'btn',
    variant ? `btn--${variant}` : '',
    size ? `btn--${size}` : '',
    isActive ? 'btn--active' : '',
    isDisabled ? 'btn--inactive' : '' // Apply inactive styling if disabled
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;