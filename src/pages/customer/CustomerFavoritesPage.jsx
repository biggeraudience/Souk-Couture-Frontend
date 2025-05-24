import React from 'react';
import ProductCard from '../../components/products/ProductCard'; // Assuming you have this component
import '../../styles/pages/customer/_customer-favorites.scss'; // NEW SCSS file

const CustomerFavoritesPage = ({ favorites, addItemToCart, removeFavorite }) => {
  return (
    <div className="customer-favorites-page">
      <h1 className="customer-favorites-page__title">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="customer-favorites-page__empty-message">
          You haven't added any products to your favorites yet.
          <br/>Browse our <a href="/products" className="text-primary">products</a> to find something you love!
        </p>
      ) : (
        <div className="customer-favorites-page__grid">
          {favorites.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addItemToCart={addItemToCart}
              addFavorite={() => {}} // No need to add favorite from this page
              removeFavorite={removeFavorite}
              isFavorited={() => true} // Always true if it's in favorites list
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerFavoritesPage;
