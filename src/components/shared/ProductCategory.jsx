// src/components/ProductCategory.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/_product-category.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import imgClothingMen from '../../assets/images/d6234e07-e00e-438c-9aa2-9ad2c47001f4_removalai_preview.png';
// ... all your other imports ...
import imgWomensClothing from '../../assets/images/d3244b0e-ddc5-4d6b-8e36-d9488df9ead0_removalai_preview.png';
import imgWomensBags from '../../assets/images/0e0bacc7-a05a-47a3-b3ba-59fdaeeb1a57_removalai_preview.png';
import imgWomensShoes from '../../assets/images/a687f390-766c-49f6-9d79-17b873887d99_removalai_preview.png';
import imgWomensPerfumes from '../../assets/images/7571b793-e6c8-4892-979f-fcd636b4875e_removalai_preview.png';
import imgWomensAccessories from '../../assets/images/cbd36c88-cf54-4c7d-9624-eb2fa3d54141_removalai_preview.png';
import imgWomensJewelry from '../../assets/images/4ea5574e-edc8-4b1a-8c92-1ba87f92788d_removalai_preview.png';
import imgWomensFabrics from '../../assets/images/27204dembroideredcotton_800x.webp';

// Placeholder images for Men's Categories (assuming similar structure for men)
import imgMensClothing from '../../assets/images/d6234e07-e00e-438c-9aa2-9ad2c47001f4_removalai_preview.png'; // Example, replace with actual men's images
import imgMensShoes from '../../assets/images/5ccf5bf3-0674-49a8-a4d9-f0d6a7738d25_removalai_preview.png'; // Example
import imgMensAccessories from '../../assets/images/0df32245-9335-4572-857c-b5937711a3b8_removalai_preview.png'; // Example
import imgMensCaps from '../../assets/images/f592318e-7a49-4a8b-a59b-f783504ba962_removalai_preview.png'; // Example
import imgMensBags from '../../assets/images/888d0df2-df37-4b37-a12d-eb05f11c78d8_removalai_preview.png'; // Example
import imgMensFragrances from '../../assets/images/2bd44ebb-5b11-411d-896b-f1af087dd194_removalai_preview.png'; // Example


const categoriesData = {
  men: [
    { name: 'Clothing', image: imgMensClothing },
    { name: 'Shoes', image: imgMensShoes },
    { name: 'Accessories', image: imgMensAccessories },
    { name: 'Caps', image: imgMensCaps },
    { name: 'Bags', image: imgMensBags },
    { name: 'Fragrances', image: imgMensFragrances },
  ],
  women: [
    { name: 'Clothing', image: imgWomensClothing },
    { name: 'Bags', image: imgWomensBags },
    { name: 'Shoes', image: imgWomensShoes },
    { name: 'Perfumes', image: imgWomensPerfumes },
    { name: 'Accessories', image: imgWomensAccessories },
    { name: 'Jewelry', image: imgWomensJewelry },
    { name: 'Fabrics', image: imgWomensFabrics },
  ],
};

// These constants should ideally come from your SCSS variables or a central config
// to ensure consistency. For now, we'll define them here to match the SCSS.
const ITEM_WIDTH_BASE = 140; // Corresponds to width in _product-category.scss
const ITEM_MARGIN_RIGHT_BASE = 16; // Corresponds to $spacing-xs in _product-category.scss

const ProductCategory = ({ gender, onSelectCategory }) => {
  const [items, setItems] = useState([]);
 
  // Initialize items when gender changes
  useEffect(() => {
    const arr = categoriesData[gender] || [];
    setItems(arr);
  }, [gender]);

  // Notify parent whenever the active (first) item changes
  useEffect(() => {
    if (items.length) {
      onSelectCategory(items[0].name);
    }
  }, [items, onSelectCategory]);

  // Rotate the items array forward or backward
  const nextSlide = () => {
    setItems(prev => {
      if (!prev.length) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };
  const prevSlide = () => {
    setItems(prev => {
      if (!prev.length) return prev;
      const arr = [...prev];
      const last = arr.pop();
      return [last, ...arr];
    });
  };

  // Jump directly to a particular index by rotating appropriately
  const goTo = (targetIndex) => {
    setItems(prev => {
      const len = prev.length;
      if (targetIndex < 0 || targetIndex >= len) return prev;
      // If targetIndex is already 0 (active), do nothing
      if (targetIndex === 0) return prev;
      
      // Rotate until targetIndex is at the front
      return [...prev.slice(targetIndex), ...prev.slice(0, targetIndex)];
    });
  };

  return (
    <div className="product-category">
      <h2 className="product-category__heading">
        Shop {gender === 'men' ? "Men's" : "Women's"} Categories
      </h2>

      <div className="product-category__carousel-wrapper">
        <button
          className="product-category__carousel-arrow product-category__carousel-arrow--left"
          onClick={prevSlide}
          aria-label="Previous category"
        >
          <FaChevronLeft />
        </button>

        {/* Removed 'no-transition' as we want the transform transition */}
        <div className="product-category__carousel-track">
          {items.map((item, idx) => {
            const distance = idx; // distance from active (first) item
            const scale = idx === 0 ? 1 : 1 - distance * 0.1;
            const opacity = idx === 0 ? 1 : 1 - distance * 0.15;

            // Calculate dynamic margin for active item if needed (like in WomensLandingPage)
            // For ProductCategory, we'll keep it simpler and rely on CSS margin-right
            // and the overall track positioning.
            const itemMarginRight = ITEM_MARGIN_RIGHT_BASE; // Base margin
            const itemWidth = ITEM_WIDTH_BASE; // Base width

            return (
              <div
                key={item.name}
                className={
                  `product-category__item ${idx === 0 ? 'product-category__item--active' : ''}`
                }
                onClick={() => goTo(idx)}
                // Apply scale and opacity. Width and margin-right are handled by SCSS primarily.
                // The 'transform' on the track itself will shift items.
                style={{ 
                    transform: `scale(${scale})`, 
                    opacity,
                    marginRight: `${itemMarginRight}px`,
                    width: `${itemWidth}px`
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-category__image"
                />
                <span className="product-category__name">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        <button
          className="product-category__carousel-arrow product-category__carousel-arrow--right"
          onClick={nextSlide}
          aria-label="Next category"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

ProductCategory.propTypes = {
  gender: PropTypes.oneOf(['men', 'women']).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default ProductCategory;