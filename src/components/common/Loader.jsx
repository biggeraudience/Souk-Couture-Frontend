import React from 'react';
// import './Loader.scss'; // If you want component-specific SCSS

const Loader = ({ isLoading, progress = 0 }) => {
  if (!isLoading) return null;

  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="loader-progress-bar">
      <div className="loader-progress-bar__bar" style={{ width: `${clampedProgress}%` }}></div>
    </div>
  );
};

export default Loader;