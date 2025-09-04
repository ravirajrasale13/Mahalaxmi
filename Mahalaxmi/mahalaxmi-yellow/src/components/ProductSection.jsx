import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductSection.css";
import { FaStar, FaChevronLeft, FaChevronRight, FaShoppingCart } from "react-icons/fa";

import img1 from "../assets/c10.png";
import img2 from "../assets/c20.jpg";
import img3 from "../assets/c30.jpg";
import img4 from "../assets/c40.jpg";

const products = [
  { id: 1, img: img1, rating: 5, reviews: 1, name: "4G Attachakki", price: "₹10000.00" },
  { id: 2, img: img2, rating: 4, reviews: 1, name: "5G Attachakki", price: "₹20000.00" },
  { id: 3, img: img3, rating: 5, reviews: 1, name: "Carnival Attachakki", price: "₹10000.00" },
  { id: 4, img: img4, rating: 5, reviews: 1, name: "Hybrid Attachakki", price: "₹10000.00" },
];

const ProductSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector(".product-card");
      if (!card) return;
      const gap = 20; // same as CSS .cards-inner gap
      const scrollAmount = card.offsetWidth + gap;
      scrollRef.current.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="product-section">
      <div className="section-header">
        <h2>
          <span className="black">Domestic</span>{" "}
          <span className="dot">•</span>{" "}
          <span className="gray">Commercial</span>{" "}
          <span className="dot">•</span>{" "}
          <span className="gray">Popular</span>
        </h2>
        <p>
          From the raw power of traditional stone milling to the precision of modern automated systems,
          we deliver machines that ensure every grain is processed to perfection.
        </p>
      </div>

      <div className="slider-wrapper">
        <button className="arrow left" onClick={() => scroll(-1)} aria-label="Scroll Left">
          <FaChevronLeft />
        </button>

        <div className="cards-scroll-container" ref={scrollRef}>
          <div className="cards-inner">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                <img src={product.img} alt={product.name} />

                <div className="product-info">
                  <div className="rating">
                    <FaStar className="star" /> {product.rating.toFixed(1)}
                    <span> ({product.reviews} reviews)</span>
                  </div>

                  <div className="category">ACCESSORIES</div>
                  <h3>{product.name}</h3>
                  <div className="price-container">
                    <div className="price">{product.price}</div>
                    <div className="select-btn" aria-label={`Select options for ${product.name}`}>
                      <span>Select options</span>
                      <FaShoppingCart />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <button className="arrow right" onClick={() => scroll(1)} aria-label="Scroll Right">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ProductSection;