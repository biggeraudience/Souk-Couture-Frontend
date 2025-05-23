// src/pages/ProductsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import ProductCard from '../components/products/ProductCard';
import '../styles/pages/_products-page.scss';

// Renamed to productsData for consistency and clarity
const productsData = [
  {
    id: '1',
    name: 'Classic Black Hoodie',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/250x300/000000/FFFFFF?text=Black+Hoodie',
    isBookmarked: false,
  },
  {
    id: '2',
    name: 'Vintage Denim Jacket',
    price: 89.00,
    imageUrl: 'https://via.placeholder.com/250x300/4682B4/FFFFFF?text=Denim+Jacket',
    isBookmarked: false,
  },
  {
    id: '3',
    name: 'Graphic Tee "Abstract"',
    price: 29.50,
    imageUrl: 'https://via.placeholder.com/250x300/8A2BE2/FFFFFF?text=Graphic+Tee',
    isBookmarked: false,
  },
  {
    id: '4',
    name: 'Cozy Knit Sweater',
    price: 65.00,
    imageUrl: 'https://via.placeholder.com/250x300/D2B48C/FFFFFF?text=Knit+Sweater',
    isBookmarked: false,
  },
  {
    id: '5',
    name: 'Sporty Track Pants',
    price: 35.75,
    imageUrl: 'https://via.placeholder.com/250x300/6A5ACD/FFFFFF?text=Track+Pants',
    isBookmarked: false,
  },
  {
    id: '6',
    name: 'Elegant Maxi Dress',
    price: 120.00,
    imageUrl: 'https://via.placeholder.com/250x300/FF69B4/FFFFFF?text=Maxi+Dress',
    isBookmarked: false,
  },
  {
    id: '7',
    name: 'Casual Polo Shirt',
    price: 40.00,
    imageUrl: 'https://via.placeholder.com/250x300/8FBC8F/FFFFFF?text=Polo+Shirt',
    isBookmarked: false,
  },
  {
    id: '8',
    name: 'Leather Boots',
    price: 150.00,
    imageUrl: 'https://via.placeholder.com/250x300/8B4513/FFFFFF?text=Leather+Boots',
    isBookmarked: false,
  },
  {
    id: '9',
    name: 'Summer Shorts',
    price: 25.00,
    imageUrl: 'https://via.placeholder.com/250x300/F0E68C/FFFFFF?text=Summer+Shorts',
    isBookmarked: false,
  },
  {
    id: '10',
    name: 'Winter Puffer Jacket',
    price: 95.00,
    imageUrl: 'https://via.placeholder.com/250x300/4682B4/FFFFFF?text=Puffer+Jacket',
    isBookmarked: false,
  },
  {
    id: '11',
    name: 'Silk Scarf',
    price: 18.00,
    imageUrl: 'https://via.placeholder.com/250x300/DA70D6/FFFFFF?text=Silk+Scarf',
    isBookmarked: false,
  },
  {
    id: '12',
    name: 'Cotton Socks (3-pack)',
    price: 12.00,
    imageUrl: 'https://via.placeholder.com/250x300/A9A9A9/FFFFFF?text=Cotton+Socks',
    isBookmarked: false,
  },
];

const ProductsPage = () => {
  const handleBookmarkToggle = (productId) => {
    console.log(`Toggling bookmark for product: ${productId}`);
    // In a real app, you would update state or send this to a backend
  };

  return (
    <section className="products-page">
      <h1 className="products-page__title">Our Products</h1>
      <div className="products-page__grid">
        {productsData.map((product) => ( // Corrected variable name from `prod` to `product`
          <Link key={product.id} to={`/products/${product.id}`} className="product-card-link">
            <ProductCard
              product={product} // Pass the entire product object directly
              onBookmarkToggle={handleBookmarkToggle} // Keep the bookmark toggle functionality
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductsPage;