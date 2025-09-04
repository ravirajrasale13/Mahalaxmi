import React, { useState, useEffect } from "react";
import "../styles/HeroSection.css";
import heroImg1 from "../assets/f1.jpg";
import heroImg2 from "../assets/f3.jpg";

const HeroSection = () => {
  const title = "Mahalaxmi Attachakki"; // Same title for both slides

  const slides = [
    {
      image: heroImg1,
      description:
        "Reliable machines that simplify every step of flour production. Designed for efficiency, easy to operate, and built to last for years."
    },
    {
      image: heroImg2,
      description:
        "Experience the next generation of grain milling. Stylish, efficient, and perfect for every home."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="hero-section">
      <svg width="0" height="0">
        <defs>
          <clipPath id="inward-curve" clipPathUnits="objectBoundingBox">
            <path
              d="
              M0.05,0
              H0.95
              C1,0 1,0 1,0.1
              V0.9
              C1,1 1,1 0.95,1
              H0.05
              C0,1 0,1 0,0.9
              V0.1
              C0,0 0,0 0.05,0
              Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="hero-wrapper">
        {/* Arrows */}
        <div className="arrow left" onClick={handlePrev}>❮</div>
        <div className="arrow right" onClick={handleNext}>❯</div>

        {/* Image + Overlay */}
        <div
          className="hero-image-container"
          style={{ clipPath: "url(#inward-curve)" }}
        >
          <img
            src={slides[currentIndex].image}
            alt={title}
            className="background-img"
          />
          <div className="hero-overlay">
            <h1>{title}</h1>
            <p>{slides[currentIndex].description}</p>
            <button className="hero-button">Discover Now</button>
          </div>
          {/* Dots navigation */}
<div className="dots-container">
  {slides.map((_, index) => (
    <span
      key={index}
      className={`dot ${currentIndex === index ? "active" : ""}`}
      onClick={() => setCurrentIndex(index)}
    ></span>
  ))}
</div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
