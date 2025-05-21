// src/components/layout/LandingPage.jsx

import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";
import "../styles/pages/_landing-page.scss";

// --- REMOVED: import heroBg from '../assets/hero-bg.webp'; ---
import menCollectionImg from '../assets/7000779701_01.jpg'; // For the men's collection image
import womenCollectionImg from '../assets/22-04-20Sofinas-32_fa9c76c4-384f-4fc0-9895-a7ff99a936db_1024x1024.webp'; // For the women's collection image


const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="landing-page">
        {/* The hero-overlay now acts as the main hero section */}
        <section
          className="hero-section-main"
          // --- REMOVED: style={{ backgroundImage: `url(${heroBg})` }} ---
          // The background-color from SCSS will now be the solid background.
        >
          <p className="hero-text">
            <strong>Welcome to Haya</strong>, where fashion is more than just clothing – it's a canvas for self‑expression and a celebration of individuality. We curate collections for both men and women who see their wardrobe as an extension of their unique stories and aspirations. Explore our thoughtfully selected pieces, from everyday essentials to statement styles, designed to empower you to look and feel your best, effortlessly. Your journey to defining your image starts here.
          </p>
          <Button
            onClick={() => navigate("/register")}
            variant="default"
            size="large"
          >
            Create Account
          </Button>
        </section>

        <section className="gender-section">
          <div className="gender-box men-box">
            <img
              src={menCollectionImg}
              alt="Men's Collection"
              className="gender-img"
            />
            <div className="gender-content">
              <p className="gender-overlay-text">Placeholder text for men’s collection</p>
              <Button
                onClick={() => navigate("/menslandingpage")}
                variant="default"
                size="default"
              >
                Men
              </Button>
            </div>
          </div>

          <div className="gender-box women-box">
            <img
              src={womenCollectionImg}
              alt="Women's Collection"
              className="gender-img"
            />
            <div className="gender-content">
              <p className="gender-overlay-text">Placeholder text for women’s collection</p>
              <Button
                onClick={() => navigate("/womenslandingpage")}
                variant="default"
                size="default"
              >
                Women
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;