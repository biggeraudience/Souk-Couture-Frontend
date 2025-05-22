// src/components/layout/LandingPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";
import "../styles/pages/_landing-page.scss";

import menCollectionImg from "../assets/7000779701_01.jpg";
import womenCollectionImg from "../assets/22-04-20Sofinas-32_fa9c76c4-384f-4fc0-9895-a7ff99a936db_1024x1024.webp";

const LandingPage = () => {
  const navigate = useNavigate();

  const genders = [
    {
      img: menCollectionImg,
      alt: "Men's Collection",
      route: "/menslandingpage",
      label: "Men",
      // Concise and compelling content for Men
      overlayText: "Discover timeless style and modern essentials for the contemporary man.",
    },
    {
      img: womenCollectionImg,
      alt: "Women's Collection",
      route: "/womenslandingpage",
      label: "Women",
      // Concise and compelling content for Women
      overlayText: "Explore chic designs and trending fashion that celebrates every woman.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="landing-page">
        <section className="gender-section">
          {genders.map(({ img, alt, route, label, overlayText }, idx) => ( // Destructure overlayText
            <div key={idx} className={`gender-box ${label.toLowerCase()}-box`}>
              <img src={img} alt={alt} className="gender-img" />

              <div className="overlay-container">
                <div className="gender-content">
                  <p className="gender-overlay-text">
                    {overlayText} {/* Use the new overlayText */}
                  </p>
                </div>
                <div className="gender-button">
                  <Button
                    onClick={() => navigate(route)}
                    variant="default"
                    size="default"
                  >
                    {label}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default LandingPage;