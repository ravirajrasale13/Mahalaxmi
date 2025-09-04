import React, { useState, useEffect } from "react";
import "../styles/ShopPage.css";
import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

import Attachakki4G from "../assets/c10.png";
import Attachakki5G from "../assets/c20.jpg";
import AttachakkiCarnival from "../assets/c30.jpg"; // ✅ Carnival
import AttachakkiHybrid from "../assets/c40.jpg";   // ✅ Hybrid

// ✅ Corrected product list
export const productsData = [
  { id: 1, name: "4G Attachakki", category: "4g", price: 10000, image: Attachakki4G },
  { id: 2, name: "5G Attachakki", category: "5g", price: 20000, image: Attachakki5G },
  { id: 3, name: "Carnival Attachakki", category: "carnival", price: 10000, image: AttachakkiCarnival },
  { id: 4, name: "Hybrid Attachakki", category: "hybrid", price: 10000, image: AttachakkiHybrid },
];

const categories = [
  { label: "All", value: "all" },
  { label: "4G Attachakki", value: "4g" },
  { label: "5G Attachakki", value: "5g" },
  { label: "Hybrid Attachakki", value: "hybrid" },
  { label: "Carnival Attachakki", value: "carnival" },
];

const ShopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, setBuyNowItem } = useCart();


  // ✅ Extract category from URL path (/shop/:categoryName)
  const pathParts = location.pathname.split("/");
  let categoryFromUrl = pathParts[2] ? pathParts[2].toLowerCase().trim() : "all";

  // ✅ Ensure valid categories
  const validCategories = categories.map((c) => c.value);
  if (!validCategories.includes(categoryFromUrl)) {
    categoryFromUrl = "all";
  }

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);

  // ✅ Update category on URL change
  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // ✅ Filter products
  const filteredProducts =
    activeCategory === "all"
      ? productsData
      : productsData.filter((product) => product.category === activeCategory);

  // Add to cart handler
  const handleAddToCart = (product) => {
    const productWithNumberPrice = { ...product, price: Number(product.price) };
    addToCart(productWithNumberPrice, 1);
  };

  return (
    <div className="shop-container">
      {/* Header */}
      <div className="shop-header">
        <h1>Our Products</h1>
        <p>Choose from a variety of Attachakki models</p>
      </div>

      {/* Filters */}
      <div className="shop-filters">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={activeCategory === cat.value ? "active" : ""}
            onClick={() => {
              setActiveCategory(cat.value);
              navigate(`/shop/${cat.value}`);
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="shop-products">
        {filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="shop-product-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${product.id}`)} // ✅ Go to detail page
            >
              {/* Product Image */}
              <div className="shop-product-image">
                <img src={product.image} alt={product.name} />
              </div>

              {/* Product Info */}
              <div className="shop-product-info">
                <h3>{product.name}</h3>
                <div className="price">₹{Number(product.price).toFixed(2)}</div>
              </div>

              {/* ✅ Action Buttons */}
              <div className="shop-product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigating
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
     <button
  className="buy-now-btn"
  onClick={(e) => {
    e.stopPropagation();
    const productWithNumberPrice = { ...product, price: Number(product.price) };

    // ✅ store product as buy now item instead of adding to cart
    setBuyNowItem({ ...productWithNumberPrice, quantity: 1 });

    navigate("/checkout");
  }}
>
  Buy Now
</button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopPage;
