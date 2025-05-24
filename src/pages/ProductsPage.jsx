// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import FilterBar from '../components/layout/FilterBar'; // REMOVE this import
import '../styles/pages/_products-page.scss';

const initialProductsData = [
  {
    id: '1',
    name: 'Classic Black Hoodie',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/250x300/000000/FFFFFF?text=Black+Hoodie',
    isBookmarked: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray'],
    description: 'A timeless black hoodie for everyday comfort. Made from a soft cotton blend.',
    category: 'Hoodies',
  },
  {
    id: '2',
    name: 'Vintage Denim Jacket',
    price: 89.00,
    imageUrl: 'https://via.placeholder.com/250x300/4682B4/FFFFFF?text=Denim+Jacket',
    isBookmarked: false,
    sizes: ['S', 'M', 'L'],
    colors: ['Blue Denim'],
    description: 'Classic fit denim jacket with a vintage wash. Perfect for layering.',
    category: 'Jackets',
  },
  {
    id: '3',
    name: 'Graphic Tee "Abstract"',
    price: 29.50,
    imageUrl: 'https://via.placeholder.com/250x300/8A2BE2/FFFFFF?text=Graphic+Tee',
    isBookmarked: false,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Purple', 'White'],
    description: '100% cotton tee featuring a unique abstract print. Comfortable and stylish.',
    category: 'T-Shirts',
  },
  {
    id: '4',
    name: 'Cozy Knit Sweater',
    price: 65.00,
    imageUrl: 'https://via.placeholder.com/250x300/D2B48C/FFFFFF?text=Knit+Sweater',
    isBookmarked: false,
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Cream'],
    description: 'Warm and soft knit sweater, ideal for chilly evenings. Relaxed fit.',
    category: 'Sweaters',
  },
  {
    id: '5',
    name: 'Sporty Track Pants',
    price: 35.75,
    imageUrl: 'https://via.placeholder.com/250x300/6A5ACD/FFFFFF?text=Track+Pants',
    isBookmarked: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Black'],
    description: 'Lightweight and breathable track pants for active lifestyles. Tapered fit.',
    category: 'Pants',
  },
  {
    id: '6',
    name: 'Elegant Maxi Dress',
    price: 120.00,
    imageUrl: 'https://via.placeholder.com/250x300/FF69B4/FFFFFF?text=Maxi+Dress',
    isBookmarked: false,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'Floral'],
    description: 'Flowy maxi dress with a flattering silhouette. Perfect for special occasions.',
    category: 'Dresses',
  },
  {
    id: '7',
    name: 'Casual Polo Shirt',
    price: 40.00,
    imageUrl: 'https://via.placeholder.com/250x300/8FBC8F/FFFFFF?text=Polo+Shirt',
    isBookmarked: false,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Green', 'White', 'Blue'],
    description: 'Classic pique knit polo shirt. Comfortable and versatile for daily wear.',
    category: 'Shirts',
  },
  {
    id: '8',
    name: 'Leather Boots',
    price: 150.00,
    imageUrl: 'https://via.placeholder.com/250x300/8B4513/FFFFFF?text=Leather+Boots',
    isBookmarked: false,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Brown', 'Black'],
    description: 'Durable leather boots with a comfortable fit. Ideal for all seasons.',
    category: 'Footwear',
  },
  {
    id: '9',
    name: 'Summer Shorts',
    price: 25.00,
    imageUrl: 'https://via.placeholder.com/250x300/F0E68C/FFFFFF?text=Summer+Shorts',
    isBookmarked: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Khaki'],
    description: 'Lightweight and breathable shorts, perfect for warm weather.',
    category: 'Pants',
  },
  {
    id: '10',
    name: 'Winter Puffer Jacket',
    price: 95.00,
    imageUrl: 'https://via.placeholder.com/250x300/4682B4/FFFFFF?text=Puffer+Jacket',
    isBookmarked: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    description: 'Insulated puffer jacket designed for maximum warmth in cold conditions.',
    category: 'Jackets',
  },
  {
    id: '11',
    name: 'Silk Scarf',
    price: 18.00,
    imageUrl: 'https://via.placeholder.com/250x300/DA70D6/FFFFFF?text=Silk+Scarf',
    isBookmarked: false,
    sizes: ['One Size'],
    colors: ['Purple', 'Patterned'],
    description: 'Luxurious silk scarf, perfect for adding a touch of elegance to any outfit.',
    category: 'Accessories',
  },
  {
    id: '12',
    name: 'Cotton Socks (3-pack)',
    price: 12.00,
    imageUrl: 'https://via.placeholder.com/250x300/A9A9A9/FFFFFF?text=Cotton+Socks',
    isBookmarked: false,
    sizes: ['One Size'],
    colors: ['White', 'Gray', 'Black'],
    description: 'Soft and breathable cotton socks in a convenient 3-pack.',
    category: 'Accessories',
  },
];

const ProductsPage = ({ filters }) => { // Receive filters as a prop
  const [filteredProducts, setFilteredProducts] = useState(initialProductsData);

  useEffect(() => {
    let productsToDisplay = [...initialProductsData];

    // Apply Category Filter
    if (filters.category !== 'All') {
      productsToDisplay = productsToDisplay.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply Price Range Filter
    if (filters.priceRange !== 'All') {
      productsToDisplay = productsToDisplay.filter((product) => {
        const price = product.price;
        switch (filters.priceRange) {
          case '0-50':
            return price >= 0 && price <= 50;
          case '51-100':
            return price >= 51 && price <= 100;
          case '101-200':
            return price >= 101 && price <= 200;
          case '201+':
            return price >= 201;
          default:
            return true;
        }
      });
    }

    // Apply Sorting
    if (filters.sort !== 'None') {
      productsToDisplay.sort((a, b) => {
        switch (filters.sort) {
          case 'Price: Low to High':
            return a.price - b.price;
          case 'Price: High to Low':
            return b.price - a.price;
          case 'Name: A-Z':
            return a.name.localeCompare(b.name);
          case 'Name: Z-A':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(productsToDisplay);
  }, [filters]); // Re-run effect when filters change

  return (
    <section className="products-page">
      <h1 className="products-page__title">Our Products</h1>
      {/* FilterBar is no longer rendered here */}
      <div className="products-page__grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-grid-item">
              <div className="product-grid-item__image-container">
                <img src={product.imageUrl} alt={product.name} className="product-grid-item__image" />
              </div>
              <div className="product-grid-item__info">
                <h3 className="product-grid-item__name">{product.name}</h3>
                <p className="product-grid-item__price">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="products-page__no-results">No products match your current filters.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;