// src/pages/ProductDetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ProductDetailPage.css";

// Import images at the top for compatibility
import c6Image from "../assets/c6.jpg";

const productDetails = {
  Attachakki: {
    name: "Premium Automatic Atta Chakki",
    description: `
      The Premium Automatic Atta Chakki is perfect for families and small businesses 
      who want fresh, healthy flour at home. It retains the natural taste and nutrients of grains 
      while delivering a consistent and smooth grinding experience.
    `,
    features: [
      "Heavy-duty copper motor for reliable performance",
      "Food-grade stainless steel grinding chamber",
      "Child-safety locking system",
      "Energy-efficient and low noise operation",
      "6 different mesh sieves for customizable flour texture",
      "Compact and elegant design for modern kitchens",
    ],
    benefits: [
      "Preserves natural nutrients during grinding",
      "Cost-effective compared to packaged flour",
      "Can grind wheat, rice, maize, pulses, and more",
      "Low maintenance and easy to clean",
    ],
    usageTips: [
      "Clean the grinding chamber after each use",
      "Choose the right sieve for desired flour texture",
      "Do not overload for optimal performance",
    ],
    specifications: {
      "Motor Power": "1 HP Copper Motor",
      "Grinding Capacity": "8–10 kg/hour",
      Voltage: "220V / 50Hz",
      Weight: "45 kg",
      Warranty: "1 Year",
    },
    image: c6Image,
  },
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = productDetails[id?.toLowerCase()]; // lowercase-safe lookup

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Oops! Product not found.</h2>
        <p>The product you’re looking for doesn’t exist or has been moved.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-wrapper">
      <img
        src={product.image}
        alt={product.name}
        className="product-detail-image"
      />
      <div className="product-detail-content">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <h3>Key Features</h3>
        <ul>
          {product.features.map((feat, index) => (
            <li key={index}>{feat}</li>
          ))}
        </ul>

        <h3>Benefits</h3>
        <ul>
          {product.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>

        <h3>Usage Tips</h3>
        <ul>
          {product.usageTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>

        <h3>Specifications</h3>
        <table className="spec-table">
          <tbody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <tr key={key}>
                <td><strong>{key}</strong></td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="product-actions">
          <button className="buy-btn">Buy Now</button>
          <button className="contact-btn">Contact Seller</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
