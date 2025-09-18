import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetail.css";

// Existing image imports
import img1 from "../assets/c10.png";
import img5 from "../assets/c20.jpg";
import img6 from "../assets/c30.jpg";
import img7 from "../assets/c40.jpg";
import img2 from "../assets/mahalaxmi3.jpg";
import img3 from "../assets/mahalaxmi4.jpg";
import img4 from "../assets/mahalaxmi5.jpg";
import img8 from "../assets/c1.jpg";
import img9 from "../assets/c2.jpg";
import img10 from "../assets/c3.jpg";

// New image imports for similar products (you would need to have these images in your assets folder)
import img11 from "../assets/c1.jpg";
import img12 from "../assets/c2.jpg";
import img13 from "../assets/c3.jpg";
import img14 from "../assets/c4.jpg";
import img15 from "../assets/c2.jpg";
import img16 from "../assets/c4.jpg";
import img17 from "../assets/c3.jpg";
import img18 from "../assets/c2.jpg";

const products = [
  // --- EXISTING PRODUCTS ---
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
    category: "4G Attachakki",
    features: [
      "High-performance domestic flour mill",
      "Modern design with powerful motor",
      "Stone and blade milling options",
    ],
    description: "High-performance domestic flour mill with modern design and powerful motor.",
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
    category: "5G Attachakki",
    features: [
      "Advanced flour mill with digital control panel",
      "Precise milling settings",
      "Durable stainless steel components",
    ],
    description: "Advanced flour mill with digital control panel for precise milling.",
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
    category: "Carnival Attachakki",
    features: [
      "Compact and stylish flour mill",
      "Perfect for modern kitchens",
      "Easy to clean and maintain",
    ],
    description: "Compact and stylish flour mill, perfect for modern kitchens.",
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
    category: "Hybrid Attachakki",
    features: [
      "Hybrid technology with stone and blade milling",
      "Ultimate freshness in every batch",
      "Energy-efficient motor",
    ],
    description: "Hybrid technology with stone and blade milling for ultimate freshness.",
  },
  {
    id: 5,
    images: [img8, img2, img3, img4],
    rating: 4,
    reviews: 2,
    name: "Pro Attachakki",
    price: 15000,
    brand: "Mahalaxmi",
    weight: "27 kg",
    power: "1.7 HP",
    dimensions: "51 x 41 x 71 cm",
    warranty: "1.5 years",
    category: "4G Attachakki",
    features: [
      "Professional-grade milling",
      "Quiet operation",
      "Large grinding capacity",
    ],
    description: "A professional-grade flour mill for high-volume use.",
  },
  {
    id: 6,
    images: [img9, img2, img3, img4],
    rating: 5,
    reviews: 3,
    name: "Classic Attachakki",
    price: 8500,
    brand: "Mahalaxmi",
    weight: "24 kg",
    power: "1.0 HP",
    dimensions: "45 x 35 x 65 cm",
    warranty: "1 year",
    category: "5G Attachakki",
    features: [
      "Traditional and reliable design",
      "Simple to use and maintain",
      "Compact and space-saving",
    ],
    description: "A classic flour mill with a simple, reliable, and user-friendly design.",
  },
  {
    id: 7,
    images: [img10, img2, img3, img4],
    rating: 5,
    reviews: 1,
    name: "Elite Attachakki",
    price: 25000,
    brand: "Mahalaxmi",
    weight: "32 kg",
    power: "2.5 HP",
    dimensions: "60 x 50 x 80 cm",
    warranty: "2 years",
    category: "Hybrid Attachakki",
    features: [
      "Top-of-the-line model with advanced features",
      "Smart control panel and settings",
      "Superior grinding performance and efficiency",
    ],
    description: "Our most advanced flour mill with superior performance and smart features.",
  },

  // --- NEW SIMILAR PRODUCTS ---
  // Adding more products for the "4G Attachakki" category
  {
    id: 8,
    images: [img11, img2, img3, img4],
    rating: 4,
    reviews: 5,
    name: "Mahalaxmi Compact",
    price: 12500,
    brand: "Mahalaxmi",
    weight: "26 kg",
    power: "1.6 HP",
    dimensions: "50 x 40 x 70 cm",
    warranty: "1 year",
    category: "4G Attachakki",
    features: [
      "Space-saving design",
      "Powerful motor for quick grinding",
      "Low noise operation",
    ],
    description: "A compact yet powerful flour mill, perfect for small kitchens and apartments.",
  },
  {
    id: 9,
    images: [img12, img2, img3, img4],
    rating: 5,
    reviews: 3,
    name: "Mahalaxmi Turbo",
    price: 18000,
    brand: "Mahalaxmi",
    weight: "28 kg",
    power: "2.0 HP",
    dimensions: "55 x 45 x 75 cm",
    warranty: "2 years",
    category: "4G Attachakki",
    features: [
      "High-speed grinding for large quantities",
      "Stainless steel blades",
      "Automatic shut-off feature",
    ],
    description: "The Turbo model is built for speed and efficiency, handling large volumes with ease.",
  },

  // Adding more products for the "5G Attachakki" category
  {
    id: 10,
    images: [img13, img2, img3, img4],
    rating: 5,
    reviews: 2,
    name: "Mahalaxmi Digital Pro",
    price: 22000,
    brand: "Mahalaxmi",
    weight: "31 kg",
    power: "2.2 HP",
    dimensions: "56 x 46 x 76 cm",
    warranty: "1.5 years",
    category: "5G Attachakki",
    features: [
      "Touch-enabled digital panel",
      "Multiple grinding modes",
      "Smart sensor technology",
    ],
    description: "An advanced flour mill with a sleek digital interface for a modern user experience.",
  },
  {
    id: 11,
    images: [img14, img2, img3, img4],
    rating: 4,
    reviews: 4,
    name: "Mahalaxmi Apex",
    price: 25000,
    brand: "Mahalaxmi",
    weight: "33 kg",
    power: "2.5 HP",
    dimensions: "60 x 50 x 80 cm",
    warranty: "2 years",
    category: "5G Attachakki",
    features: [
      "Top-tier performance and durability",
      "IoT connectivity for remote control",
      "Silent grinding technology",
    ],
    description: "The Apex model combines the latest technology with unmatched performance.",
  },

  // Adding more products for the "Carnival Attachakki" category
  {
    id: 12,
    images: [img15, img2, img3, img4],
    rating: 4,
    reviews: 1,
    name: "Mahalaxmi Sparkle",
    price: 9500,
    brand: "Mahalaxmi",
    weight: "21 kg",
    power: "1.0 HP",
    dimensions: "47 x 37 x 67 cm",
    warranty: "1 year",
    category: "Carnival Attachakki",
    features: [
      "Stylish, colorful design options",
      "Feather-light and easy to move",
      "Simple one-button operation",
    ],
    description: "A fun and functional flour mill that adds a pop of color to your kitchen.",
  },
  {
    id: 13,
    images: [img16, img2, img3, img4],
    rating: 5,
    reviews: 2,
    name: "Mahalaxmi Decor",
    price: 11000,
    brand: "Mahalaxmi",
    weight: "23 kg",
    power: "1.3 HP",
    dimensions: "49 x 39 x 69 cm",
    warranty: "1 year",
    category: "Carnival Attachakki",
    features: [
      "Elegant finish to match modern decor",
      "Integrated storage for accessories",
      "Low maintenance design",
    ],
    description: "Designed for elegance and convenience, the Decor model is a perfect blend of style and substance.",
  },

  // Adding more products for the "Hybrid Attachakki" category
  {
    id: 14,
    images: [img17, img2, img3, img4],
    rating: 5,
    reviews: 3,
    name: "Mahalaxmi Fusion",
    price: 17000,
    brand: "Mahalaxmi",
    weight: "29 kg",
    power: "1.9 HP",
    dimensions: "53 x 43 x 73 cm",
    warranty: "1.5 years",
    category: "Hybrid Attachakki",
    features: [
      "Combines stone and blade grinding for flexibility",
      "Adjustable fineness control",
      "High-efficiency motor",
    ],
    description: "The Fusion model gives you the best of both worlds with its unique hybrid grinding technology.",
  },
  {
    id: 15,
    images: [img18, img2, img3, img4],
    rating: 4,
    reviews: 1,
    name: "Mahalaxmi Omni-Grind",
    price: 21000,
    brand: "Mahalaxmi",
    weight: "30 kg",
    power: "2.1 HP",
    dimensions: "55 x 45 x 75 cm",
    warranty: "2 years",
    category: "Hybrid Attachakki",
    features: [
      "Versatile grinding for a wide range of grains",
      "Advanced cooling system to prevent overheating",
      "Durable and long-lasting build",
    ],
    description: "A versatile grinder that can handle any grain, from wheat to spices, with its powerful hybrid system.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0]);

  const { addToCart, setBuyNowItem } = useCart();

  useEffect(() => {
    setMainImage(product?.images[0]);
  }, [product]);

  if (!product) return <h2>Product Not Found</h2>;

  const handleAddToCart = () => {
    addToCart({ ...product, image: mainImage }, quantity);
  };

  const handleBuyNow = () => {
    setBuyNowItem({ ...product, image: mainImage, quantity });
    navigate("/checkout");
  };

  // Find similar products based on the same category and exclude the current product
  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="product-detail">
      <div className="detail-container">
        {/* Product Images */}
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

        {/* Product Info */}
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

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="similar-products-section">
          <h2>Similar Products</h2>
          <div className="similar-products-container">
            {similarProducts.map((p) => (
              <div
                key={p.id}
                className="similar-product-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img src={p.images[0]} alt={p.name} className="similar-product-img" />
                <h3>{p.name}</h3>
                <p className="price">₹{p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;