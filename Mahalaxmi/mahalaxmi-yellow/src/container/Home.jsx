import React from "react";
import HeroBanner from "../components/HeroBanner";
import ProductGrid from "../components/ProductGrid";
import ImageCards from "../components/ImageCards";
import ExtraImageCards from "../components/ExtraImageCards"; // ✅ new section

const Home = () => {
  return (
    <>
      <div className="container">
        <HeroBanner />
      </div>

      <div className="container">
        <ImageCards />
      </div>

      {/* ✅ Full-width 2 rows × 5 cards section */}
      <ExtraImageCards />

      <div className="container">
        <ProductGrid />
      </div>
    </>
  );
};

export default Home;
