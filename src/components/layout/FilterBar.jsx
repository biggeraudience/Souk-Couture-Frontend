// src/components/layout/FilterBar.jsx
import React, { useState } from 'react';
import '../../styles/layouts/_filter-bar.scss';

const FilterBar = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedSort, setSelectedSort] = useState('None');

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange({ category, priceRange: selectedPriceRange, sort: selectedSort });
  };

  const handlePriceRangeChange = (e) => {
    const priceRange = e.target.value;
    setSelectedPriceRange(priceRange);
    onFilterChange({ category: selectedCategory, priceRange, sort: selectedSort });
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSelectedSort(sort);
    onFilterChange({ category: selectedCategory, priceRange: selectedPriceRange, sort });
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__section">
        <label htmlFor="category-filter" className="filter-bar__label">Category:</label>
        <select
          id="category-filter"
          className="filter-bar__select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          <option value="Hoodies">Hoodies</option>
          <option value="Jackets">Jackets</option>
          <option value="T-Shirts">T-Shirts</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Pants">Pants</option>
          <option value="Dresses">Dresses</option>
          <option value="Shirts">Shirts</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="filter-bar__section">
        <label htmlFor="price-filter" className="filter-bar__label">Price Range:</label>
        <select
          id="price-filter"
          className="filter-bar__select"
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
        >
          <option value="All">All</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201+">$201+</option>
        </select>
      </div>

      <div className="filter-bar__section">
        <label htmlFor="sort-filter" className="filter-bar__label">Sort By:</label>
        <select
          id="sort-filter"
          className="filter-bar__select"
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="None">None</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
          <option value="Name: A-Z">Name: A-Z</option>
          <option value="Name: Z-A">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;