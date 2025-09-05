import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetail.css";
import img1 from "../assets/c1000.png";
import img5 from "../assets/c100.png";
import img6 from "../assets/c30.jpg";
import img7 from "../assets/c40.jpg";
import img2 from "../assets/mahalaxmi3.jpg";
import img3 from "../assets/mahalaxmi4.jpg";
import img4 from "../assets/mahalaxmi5.jpg";

const products = [
  {
    id: 1,
    images: [img1, img2, img3, img4],
    rating: 5,
    reviews: 1,
    name: "4G Attachakki",
    price: 10000,
    brand: "Mahalaxmi",
    weight: "25 kg",
    power: "1.5 HP",
    dimensions: "50 x 40 x 70 cm",
    warranty: "1 year",
    features: [
      "High-performance domestic flour mill",
      "Modern design with powerful motor",
      "Stone and blade milling options",
    ],
    description:
      "High-performance domestic flour mill with modern design and powerful motor.",
  },
  {
    id: 2,
    images: [img5, img2, img3, img4],
    rating: 4,
    reviews: 1,
    name: "5G Attachakki",
    price: 20000,
    brand: "Mahalaxmi",
    weight: "30 kg",
    power: "2 HP",
    dimensions: "55 x 45 x 75 cm",
    warranty: "1 year",
    features: [
      "Advanced flour mill with digital control panel",
      "Precise milling settings",
      "Durable stainless steel components",
    ],
    description:
      "Advanced flour mill with digital control panel for precise milling.",
  },
  {
    id: 3,
    images: [img6, img2, img3, img4],
    rating: 5,
    reviews: 1,
    name: "Carnival Attachakki",
    price: 10000,
    brand: "Mahalaxmi",
    weight: "22 kg",
    power: "1.2 HP",
    dimensions: "48 x 38 x 68 cm",
    warranty: "1 year",
    features: [
      "Compact and stylish flour mill",
      "Perfect for modern kitchens",
      "Easy to clean and maintain",
    ],
    description:
      "Compact and stylish flour mill, perfect for modern kitchens.",
  },
  {
    id: 4,
    images: [img7, img2, img3, img4],
    rating: 5,
    reviews: 1,
    name: "Hybrid Attachakki",
    price: 10000,
    brand: "Mahalaxmi",
    weight: "28 kg",
    power: "1.8 HP",
    dimensions: "52 x 42 x 72 cm",
    warranty: "1 year",
    features: [
      "Hybrid technology with stone and blade milling",
      "Ultimate freshness in every batch",
      "Energy-efficient motor",
    ],
    description:
      "Hybrid technology with stone and blade milling for ultimate freshness.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0]);

  // ✅ pull setBuyNowItem from CartContext
  const { addToCart, setBuyNowItem } = useCart();

  if (!product) return <h2>Product Not Found</h2>;

  const handleAddToCart = () => {
    addToCart({ ...product, image: mainImage }, quantity);
  };

  // ✅ Buy Now now sets a separate buyNowItem
  const handleBuyNow = () => {
    setBuyNowItem({ ...product, image: mainImage, quantity });
    navigate("/checkout");
  };

  return (
    <div className="product-detail">
      <div className="detail-container">
        <div className="image-section">
          <img src={mainImage} alt={product.name} className="main-product-img" />
          <div className="thumbnail-gallery">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>
        <div className="info-section">
          <h1>{product.name}</h1>
          <div className="rating">
            <FaStar className="star" /> {product.rating}{" "}
            <span>({product.reviews} reviews)</span>
          </div>

          <p className="price">₹{product.price.toLocaleString()}</p>

          <p className="description big-description">{product.description}</p>

          <div className="additional-info">
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Weight:</strong> {product.weight}</p>
            <p><strong>Power:</strong> {product.power}</p>
            <p><strong>Dimensions:</strong> {product.dimensions}</p>
            <p><strong>Warranty:</strong> {product.warranty}</p>
            <p><strong>Features:</strong></p>
            <ul>
              {product.features.map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>

          <div className="quantity-section">
            <label htmlFor="quantity">Quantity: </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className="button-group">
            <button className="cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
