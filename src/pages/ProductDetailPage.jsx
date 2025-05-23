import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/pages/_product-detail-page.scss';

// Sample product data (replace with API call in a real application)
const productsData = [
  {
    id: '1',
    name: 'Classic Black Hoodie',
    price: 49.99,
    description: 'A comfortable and stylish black hoodie made from 100% organic cotton. Perfect for everyday wear, offering warmth and a modern fit.',
    imageUrl: 'https://via.placeholder.com/600x700/000000/FFFFFF?text=Classic+Black+Hoodie',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    availability: true,
    images: ['https://via.placeholder.com/600x700/000000/FFFFFF?text=Classic+Black+Hoodie'], // Add images for cart
  },
  {
    id: '2',
    name: 'Vintage Denim Jacket',
    price: 89.00,
    description: 'Timeless vintage-wash denim jacket with distressed details. A versatile layering piece for all seasons.',
    imageUrl: 'https://via.placeholder.com/600x700/4682B4/FFFFFF?text=Vintage+Denim+Jacket',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue', 'Light Blue'],
    availability: true,
    images: ['https://via.placeholder.com/600x700/4682B4/FFFFFF?text=Vintage+Denim+Jacket'], // Add images for cart
  },
  {
    id: '3',
    name: 'Graphic Tee "Abstract"',
    price: 29.50,
    description: 'Express yourself with this unique abstract graphic tee. Soft cotton blend for ultimate comfort.',
    imageUrl: 'https://via.placeholder.com/600x700/8A2BE2/FFFFFF?text=Graphic+Tee+Abstract',
    sizes: ['S', 'M', 'L'],
    colors: ['Purple', 'White', 'Black'],
    availability: false,
    images: ['https://via.placeholder.com/600x700/8A2BE2/FFFFFF?text=Graphic+Tee+Abstract'], // Add images for cart
  },
  {
    id: '4',
    name: 'Cozy Knit Sweater',
    price: 65.00,
    description: 'Luxuriously soft knit sweater, perfect for chilly evenings. Features a classic crew neck design.',
    imageUrl: 'https://via.placeholder.com/600x700/D2B48C/FFFFFF?text=Cozy+Knit+Sweater',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Cream', 'Brown'],
    availability: true,
    images: ['https://via.placeholder.com/600x700/D2B48C/FFFFFF?text=Cozy+Knit+Sweater'], // Add images for cart
  },
];

const ProductDetailPage = ({ addItemToCart, addFavorite, removeFavorite, isFavorited }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local state for bookmark, initialized from prop
  const [localIsBookmarked, setLocalIsBookmarked] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes?.[0] || null);
      setSelectedColor(foundProduct.colors?.[0] || null);
      // Initialize local bookmark state based on the prop
      setLocalIsBookmarked(isFavorited(foundProduct.id));
    } else {
      setError('Product not found.');
    }
    setLoading(false);
  }, [productId, isFavorited]); // Add isFavorited to dependency array

  const handleBookmarkToggle = () => {
    if (product) {
      if (localIsBookmarked) {
        removeFavorite(product.id);
      } else {
        addFavorite({
          id: product.id,
          name: product.name,
          images: product.images,
          price: product.price,
        });
      }
      setLocalIsBookmarked(!localIsBookmarked); // Update local state immediately for responsiveness
      console.log(`Bookmark status for ${product.name}: ${!localIsBookmarked}`);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color.');
      return;
    }
    if (product) {
      addItemToCart({
        id: product.id,
        name: product.name,
        images: product.images,
        selectedSize: selectedSize,
        selectedColors: [selectedColor], // Assuming a single selected color for simplicity
        quantity: 1,
        price: product.price,
        isBespoke: false, // You can add logic here to determine if it's bespoke
      });
      alert(`${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) added to cart!`);
      // Optionally navigate to cart page after adding
      navigate('/cart');
    }
  };

  if (loading) {
    return <div className="product-detail text-center">Loading product...</div>;
  }

  if (error) {
    return <div className="product-detail text-error text-center">{error}</div>;
  }

  if (!product) {
    return <div className="product-detail text-center">Product not found.</div>;
  }

  return (
    <section className="product-detail">
      <div className="product-detail__image-gallery">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-detail__details">
        <h1 className="product-detail__name">{product.name}</h1>
        <p className="product-detail__price">${product.price.toFixed(2)}</p>
        <p className="product-detail__description">{product.description}</p>

        {product.sizes && product.sizes.length > 0 && (
          <div className="product-detail__options-group">
            <label htmlFor="size-selector">Size:</label>
            <div className="product-detail__options-selector">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`option-btn ${selectedSize === size ? 'option-btn--active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className="product-detail__options-group">
            <label htmlFor="color-selector">Color:</label>
            <div className="product-detail__options-selector">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`option-btn ${selectedColor === color ? 'option-btn--active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="product-detail__actions">
          <button
            className="btn-add-to-cart"
            onClick={handleAddToCart}
            disabled={!product.availability || !selectedSize || !selectedColor} // Disable if out of stock or options not selected
          >
            {product.availability ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button
            className={`btn-bookmark ${localIsBookmarked ? 'btn-bookmark--bookmarked' : ''}`}
            onClick={handleBookmarkToggle}
            aria-label={localIsBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          >
            {localIsBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>

        {!product.availability && (
          <p className="text-error text-center" style={{ marginTop: '1.6rem' }}>
            This item is currently out of stock.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductDetailPage;