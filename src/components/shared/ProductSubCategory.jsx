import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../styles/components/_product-subcategory.scss';

// Import the new dedicated SubCategoryButton
import SubCategoryButton from '../common/SubCategoryButton';

// --- IMPORT MEN'S SUBCATEGORY IMAGES ---
import imgKandoor from '../../assets/images/02e76747-f92a-466c-8465-7e58694ef34c_removalai_preview.png';
import imgKaftan from '../../assets/images/da233f56-0b70-447d-9713-109ab1ce8638_removalai_preview.png';
import imgAgbada from '../../assets/images/baf874f9-bdb5-4433-b027-b17e735c8f26_removalai_preview.png';
import imgLuxuryBagsMen from '../../assets/images/888d0df2-df37-4b37-a12d-eb05f11c78d8_removalai_preview.png';
import imgTravelBagsMen from '../../assets/images/de4ff3a6-2a7e-4e7a-8411-558b00162cf6_removalai_preview.png';
import imgFormalShoesMen from '../../assets/images/e4908e22-6cbf-4c31-b4c9-543c38dd20cb_removalai_preview.png';
import imgCasualShoesMen from '../../assets/images/016949d1-a88a-4df9-a1a6-8f9a0ee80426_removalai_preview.png';

import imgOrientalPerfumesMen from '../../assets/images/71d89d79-cf4c-402a-891a-296c5d49078a_removalai_preview.png';
import imgWoodyPerfumesMen from '../../assets/images/2bd44ebb-5b11-411d-896b-f1af087dd194_removalai_preview.png';

import imgCufflinksMen from '../../assets/images/aa620d38-3ec4-4660-a98e-93a0b41c3387_removalai_preview.png';
import imgWatchesMen from '../../assets/images/3ebb9060-3f21-45c3-960f-c0286bccdc54_removalai_preview.png';

import imgTraditionalCapsMen from '../../assets/images/3ebb9060-3f21-45c3-960f-c0286bccdc54_removalai_preview.png';
import imgModernCapsMen from '../../assets/images/3ebb9060-3f21-45c3-960f-c0286bccdc54_removalai_preview.png';
import imgPlainFabricsMen from '../../assets/images/27399cpurewoolzegna_800x.jpg';
import imgPatternFabricsMen from '../../assets/images/20934d_800x.jpg';

import imgMensFormalWatches from '../../assets/images/54a971d8-9ba5-4e83-9fdc-e3420271f255_removalai_preview.png';
import imgMensSportWatches from '../../assets/images/3ebb9060-3f21-45c3-960f-c0286bccdc54_removalai_preview.png';

import imgMensFreshFragrances from '../../assets/images/71d89d79-cf4c-402a-891a-296c5d49078a_removalai_preview.png';
import imgMensIntenseFragrances from '../../assets/images/2bd44ebb-5b11-411d-896b-f1af087dd194_removalai_preview.png';

// --- IMPORT WOMEN'S SUBCATEGORY IMAGES ---
import imgCasualWomens from '../../assets/images/7f77c3e9-596b-4c9a-8994-177e788e4b37_removalai_preview.png';
import imgFormalWomens from '../../assets/images/49d86bca-32d4-4a3a-b289-6b6e27697ae2_removalai_preview.png';
import imgHandbagToteWomens from '../../assets/images/c352085b-fcfb-4331-b45f-09365b082b2b_removalai_preview.png';
import imgHandbagClutchWomens from '../../assets/images/ac66b33b-d732-40c7-bd8f-d896939891ab_removalai_preview.png';
import imgShoeHeelsWomens from '../../assets/images/f208f531-03b5-44c0-beea-ff4f08436931_removalai_preview.png';
import imgShoeFlatsWomens from '../../assets/images/f9e07e00-cdcc-49f0-b6e3-5636c6df05bb_removalai_preview.png';
import imgPerfumeFloralWomens from '../../assets/images/87765a6a-05f5-41ce-aa2f-d30481ea693d_removalai_preview.png';
import imgPerfumeSweetWomens from '../../assets/images/7ac0a455-e209-4f75-b913-1ec4cf801034_removalai_preview.png';
import imgAccessoryScarfWomens from '../../assets/images/84abc794-0d32-4832-b8b1-b66f397aceaa_removalai_preview.png';
import imgAccessoryWatchesWomens from '../../assets/images/cbd36c88-cf54-4c7d-9624-eb2fa3d54141_removalai_preview.png';
import imgJewelryNecklaceWomens from '../../assets/images/20f6507f-9903-4f99-92fc-83019b066945_removalai_preview.png';
import imgJewelryEarringsWomens from '../../assets/images/53334036-0464-44df-857b-b389db5c1adc_removalai_preview.png';
import imgPlainFabricsWomens from '../../assets/images/23772c_silk_crepe_de_chine_800x.jpg';
import imgPatternFabricsWomens from '../../assets/images/27210dembroideredcotton_800x.webp';
import imgEverydayVeils from '../../assets/images/22-04-20Sofinas-32_fa9c76c4-384f-4fc0-9895-a7ff99a936db_1024x1024.webp';
import imgOccasionVeils from '../../assets/images/7000779701_01.jpg';

// Define placeholder data for subcategories for both genders (remains the same)
const subcategoriesData = {
  men: {
    Clothing: [
      { id: 'men-clothing-kaftan', name: 'Kaftan', image: imgKaftan, description: 'Elegant and modern kaftans crafted from premium fabric.' },
      { id: 'men-clothing-kandoor', name: 'Kandoor', image: imgKandoor, description: 'Traditional Kandooras with a contemporary twist.' },
      { id: 'men-clothing-agbada', name: 'Agbada', image: imgAgbada, description: 'Majestic Agbadas for your most special ceremonies.' },
    ],
    Bags: [
      { id: 'men-bags-luxury', name: 'Luxury Bags', image: imgLuxuryBagsMen, description: 'Handcrafted leather bags for the discerning gentleman.' },
      { id: 'men-bags-travel', name: 'Travel Bags', image: imgTravelBagsMen, description: 'Spacious, durable travel bags for every adventure.' },
    ],
    Shoes: [
      { id: 'men-shoes-formal', name: 'Formal Shoes', image: imgFormalShoesMen, description: 'Polished leather oxfords and loafers.' },
      { id: 'men-shoes-casual', name: 'Casual Shoes', image: imgCasualShoesMen, description: 'Comfort meets style in our casual collection.' },
    ],
    Fragrances: [
      { id: 'men-fragrances-fresh', name: 'Fresh & Aquatic', image: imgMensFreshFragrances, description: 'Crisp, clean, and invigorating scents for daily wear.' },
      { id: 'men-fragrances-intense', name: 'Intense & Evening', image: imgMensIntenseFragrances, description: 'Deep, complex fragrances perfect for special occasions.' },
    ],
    Accessories: [
      { id: 'men-accessories-cufflinks', name: 'Cufflinks', image: imgCufflinksMen, description: 'Distinctive designs in sterling silver and enamel.' },
      { id: 'men-accessories-watches-sub', name: 'Accessory Watches', image: imgWatchesMen, description: 'Smaller watches within accessories.' },
    ],
    Watches: [
      { id: 'men-watches-formal', name: 'Formal Watches', image: imgMensFormalWatches, description: 'Classic and elegant timepieces for sophisticated occasions.' },
      { id: 'men-watches-sport', name: 'Sport Watches', image: imgMensSportWatches, description: 'Durable and feature-rich watches for the active man.' },
    ],
    Caps: [
      { id: 'men-caps-traditional', name: 'Traditional Caps', image: imgTraditionalCapsMen, description: 'Classic embroidered designs.' },
      { id: 'men-caps-modern', name: 'Modern Caps', image: imgModernCapsMen, description: 'Sleek silhouettes in contemporary fabrics.' },
    ],
    Fabrics: [
      { id: 'men-fabrics-plain', name: 'Plain Wool & Cotton', image: imgPlainFabricsMen, description: 'Sumptuous pure-wool serges, crisp Egyptian cottons, and breathable linens in timeless solids.' },
      { id: 'men-fabrics-pattern', name: 'Patterned Weaves', image: imgPatternFabricsMen, description: 'From herringbone and checks to pinstripes and jacquards—bring a dash of character to every suit or shirt.' },
    ],
  },
  women: {
    Clothing: [
      { id: 'women-clothing-formal', name: 'Formal Abayas', image: imgFormalWomens, description: 'Flowing abayas in luxe crepe and silk blends, featuring modern cuts and delicate embellishments.' },
      { id: 'women-clothing-casual', name: 'Casual Abayas', image: imgCasualWomens, description: 'Comfortable yet elegant abayas in vibrant prints and rich solids, perfect for leisure and special occasions.' },
    ],
    Handbags: [
      { id: 'women-handbags-tote', name: 'Tote Bags', image: imgHandbagToteWomens, description: 'Spacious and versatile tote bags.' },
      { id: 'women-handbags-clutches', name: 'Clutches', image: imgHandbagClutchWomens, description: 'Elegant clutches for evening wear.' },
    ],
    Shoes: [
      { id: 'women-shoes-heels', name: 'Heels', image: imgShoeHeelsWomens, description: 'Elevate your look with our range of heels.' },
      { id: 'women-shoes-flats', name: 'Flats', image: imgShoeFlatsWomens, description: 'Comfortable and stylish flats for everyday.' },
    ],
    Perfumes: [
      { id: 'women-perfumes-floral', name: 'Floral Scents', image: imgPerfumeFloralWomens, description: 'Light and refreshing floral fragrances.' },
      { id: 'women-perfumes-sweet', name: 'Sweet Scents', image: imgPerfumeSweetWomens, description: 'Sweet and inviting fragrances.' },
    ],
    Accessories: [
      { id: 'women-accessories-scarves', name: 'Scarves', image: imgAccessoryScarfWomens, description: 'Stylish scarves in various patterns and fabrics.' },
      { id: 'women-accessories-watches', name: 'Watches', image: imgAccessoryWatchesWomens, description: 'Sophisticated timepieces in rose-gold, stainless steel, and leather straps—designed to elevate both day and evening ensembles.' },
    ],
    Jewelry: [
      { id: 'women-jewelry-necklaces', name: 'Necklaces', image: imgJewelryNecklaceWomens, description: 'Elegant necklaces for any neckline.' },
      { id: 'women-jewelry-earrings', name: 'Earrings', image: imgJewelryEarringsWomens, description: 'From studs to chandeliers, find your perfect pair.' },
    ],
    Fabrics: [
      { id: 'women-fabrics-plain', name: 'Silks & Satins', image: imgPlainFabricsWomens, description: 'Delicate charmeuse silks, glossy satins, and soft crepes in solid hues for dresses, blouses, and eveningwear.' },
      { id: 'women-fabrics-pattern', name: 'Printed Voiles & Chiffons', image: imgPatternFabricsWomens, description: 'Lightweight voiles, floaty chiffons, and artisan prints—from florals to geometrics—for your signature style.' },
    ],
    Veils: [
      { id: 'women-veils-everyday', name: 'Everyday Veils', image: imgEverydayVeils, description: 'Comfortable and stylish for daily wear.' },
      { id: 'women-veils-occasion', name: 'Occasion Veils', image: imgOccasionVeils, description: 'Elegant designs for special events.' },
    ],
  },
};

const ProductSubCategory = ({ gender, selectedCategory }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const subcategories = subcategoriesData[gender]?.[selectedCategory] || [];

  const handleShopNowClick = () => {
    // Navigate to the products page
    navigate('/products');
    // Optionally, you could pass state or query params to pre-filter the products page
    // For example: navigate(`/products?gender=${gender}&category=${selectedCategory}&subcategory=${subcat.name}`);
  };

  if (subcategories.length === 0) {
    return (
      <div className="product-subcategory-empty">
        <p>No subcategories found for "{selectedCategory}" in {gender}'s collection.</p>
      </div>
    );
  }

  return (
    <div className="product-subcategory">
      <h3 className="product-subcategory__title">Explore {selectedCategory}</h3>
      <div className="product-subcategory__list">
        {subcategories.map((subcat) => (
          <div key={subcat.id} className="product-subcategory__item">
            <div className="product-subcategory__image-wrapper">
              <img src={subcat.image} alt={subcat.name} className="product-subcategory__image" />
            </div>
            <div className="product-subcategory__content">
              <h4 className="product-subcategory__name">{subcat.name}</h4>
              <p className="product-subcategory__description">{subcat.description}</p>
              <SubCategoryButton
                onClick={handleShopNowClick} // Call the new handler
              >
                Shop Now
              </SubCategoryButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductSubCategory.propTypes = {
  gender: PropTypes.oneOf(['men', 'women']).isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default ProductSubCategory;