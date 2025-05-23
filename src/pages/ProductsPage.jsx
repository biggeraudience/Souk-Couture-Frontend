// src/pages/ProductsPage.jsx
import React from 'react';
import ProductCard from '../components/products/ProductCard';
import '../styles/pages/_products-page.scss';

const placeholderProducts = Array.from({ length: 12 }, (_, i) => ({ id: `ph${i}` }));

const ProductsPage = () => (
  <section className="products-page">
    <h1 className="products-page__title">Our Products</h1>
    <div className="products-page__grid">
      {placeholderProducts.map((prod) => (
        <ProductCard
          key={prod.id}
          product={{
            id: prod.id,
            name: 'Product Name',
            price: 0,
            imageUrl: 'https://via.placeholder.com/250x300?text=Product',
            isBookmarked: false,
          }}
          onBookmarkToggle={() => {}}
        />
      ))}
    </div>
  </section>
);

export default ProductsPage;
