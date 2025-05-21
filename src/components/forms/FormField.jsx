import React from 'react';
// import './FormField.scss'; // If you want component-specific SCSS

const FormField = ({ label, type = 'text', name, value, onChange, error, placeholder, ...props }) => {
  const inputClass = type === 'textarea' ? 'form-textarea' : 'form-input';

  return (
    <div className="form-group">
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          {...props}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClass}
          {...props}
        />
      )}
      {error && <p className="form-error-message">{error}</p>}
    </div>
  );
};

export default FormField;