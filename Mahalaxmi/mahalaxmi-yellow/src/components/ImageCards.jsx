import React from "react";
import { Link } from "react-router-dom";
import "../styles/ImageCards.css";

import img1 from "../assets/c6.jpg";
import img2 from "../assets/c7.jpg";
import img3 from "../assets/c8.jpg";

const images = [
  {
    src: img1,
    title: "Best Quality Product",
    description: "High-quality product with premium materials.",
    price: "$120",
  },
  {
    src: img2,
    title: "High Build Quality",
    description: "Durable and designed to last.",
    price: "$150",
  },
  {
    src: img3,
    title: "Premium Finish Product",
    description: "Elegant design with premium finish.",
    price: "$180",
  },
];

const ImageCards = () => {
  return (
    <section className="image-cards-wrapper">
      <div className="image-cards-container">
        {images.map((item, index) => (
        <Link
  to={`/image-info/${index}`} // instead of /product
  key={index}
  className="image-card"
>

            <img src={item.src} alt={item.title} />
            <div className="image-text">
              {item.title.split(" ").map((word, i) => (
                <span key={i}>{word}</span>
              ))}
            </div>
            <div className="image-cards-arrow-square">
              <span className="image-cards-arrow">{">"}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ImageCards;
