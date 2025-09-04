import React from "react";
import "../styles/HomePage.css";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";

const HomePage = () => {
    return (
        <div className="home-container">
            <HeroSection />
            <ProductSection />
        </div>
    );
};

export default HomePage;
