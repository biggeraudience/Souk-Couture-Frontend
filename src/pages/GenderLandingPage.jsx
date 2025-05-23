// src/pages/GenderLandingPage.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import AnnouncementBar from '../components/shared/AnnouncementBar';
import ProductCategory from '../components/shared/ProductCategory';
import ProductSubCategory from '../components/shared/ProductSubCategory';
import '../../src/styles/pages/_gender-landing-page.scss';

// Import categoriesData directly if you want to initialize selectedCategory more robustly
// Or ensure ProductCategory.jsx is exported so categoriesData can be imported from there.
// For now, let's assume 'Clothing' is a safe default for both genders.
// If you want to use the actual first item, you'd need to import categoriesData here
// For example:
// import { categoriesData } from '../components/ProductCategory'; // If exported

const GenderLandingPage = ({ gender }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Set initial selected category when gender changes or on first load
  // This useEffect ensures that when the page first loads or the gender prop changes,
  // the subcategories immediately show content for a default category (e.g., 'Clothing').
  useEffect(() => {
    // A more robust way to set the initial category would be to
    // import categoriesData here and get the first category name.
    // For simplicity, we'll hardcode 'Clothing' as it's common.
    if (gender === 'men' || gender === 'women') {
      setSelectedCategory('Clothing');
    }
  }, [gender]);

  // This function is passed to ProductCategory to receive updates
  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const pageTitle = gender === 'men' ? "Men's Collection - Souk Couture" : "Women's Collection - Souk Couture";
  const pageDescription = gender === 'men'
    ? "Explore Souk Couture's exclusive collection for men: clothing, shoes, accessories, and more."
    : "Discover Souk Couture's latest fashion for women: dresses, shoes, bags, perfumes, and stylish veils.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      <div className="gender-landing-page">
        <AnnouncementBar />
        <section className="gender-landing-page__content">
          {/* ProductCategory passes the selected category back to GenderLandingPage */}
          <ProductCategory gender={gender} onSelectCategory={handleSelectCategory} />
          {/* ProductSubCategory receives the selected category from GenderLandingPage */}
          <ProductSubCategory gender={gender} selectedCategory={selectedCategory} />
        </section>
      </div>
    </>
  );
};

GenderLandingPage.propTypes = {
  gender: PropTypes.oneOf(['men', 'women']).isRequired,
};

export default GenderLandingPage;