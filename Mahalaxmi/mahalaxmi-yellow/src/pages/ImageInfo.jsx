import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; 
import "../styles/ImageInfo.css";

import shopimage from "../assets/shopimage.jpg"; 
import img1 from "../assets/c1000.png";
import img2 from "../assets/c100.png";
import img3 from "../assets/c30.jpg";
import img4 from "../assets/c40.jpg";

const images = [
  {
    src: img1,
    title: "4G Attachakki",
    description: "High-quality product with premium materials.",
    price: "10000",
  },
  {
    src: img2,
    title: "5G Attachakki",
    description: "Durable and designed to last.",
    price: "20000",
  },
  {
    src: img3,
    title: "Hybrid Attachakki",
    description: "Elegant design with premium finish.",
    price: "10000",
  },
  {
    src: img4,
    title: "Carnival Attachakki",
    description: "Stylish and functional design.",
    price: "20000",
  },
];

const ImageInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!images[id]) return <h2>Product not found</h2>;

  const goToShop = (productIndex) => {
    navigate(`/shop/${productIndex}`);
  };

  return (
    <div className="image-info-container">
      {/* Banner */}
      <div className="main-image-wrapper">
        <img src={shopimage} alt="Smart Atta Chakki" className="main-image" />
        <div className="main-overlay">
          <h1 className="main-title">Our Products</h1>
          <p className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link> / Products
          </p>
        </div>
      </div>

      {/* First 3 product cards */}
      <div className="cards-row">
        {images.slice(0, 3).map((item, index) => (
          <div key={index} className="card">
            <img src={item.src} alt={item.title} className="card-img" />
            <h4>{item.title}</h4>
            <p className="card-description">{item.description}</p> {/* Added description */}
            <p className="card-price">₹{item.price}</p>
            <button onClick={() => goToShop(index)}>Click To View</button>
          </div>
        ))}
      </div>

      {/* Remaining product cards */}
      {images.length > 3 && (
        <div className="more-products">
          <div className="cards-row">
            {images.slice(3).map((item, index) => (
              <div key={index + 3} className="card">
                <img src={item.src} alt={item.title} className="card-img" />
                <h4>{item.title}</h4>
                <p className="card-description">{item.description}</p> {/* Added description */}
                <p className="card-price">₹{item.price}</p>
                <button onClick={() => goToShop(index + 3)}>Click To View</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInfo;
