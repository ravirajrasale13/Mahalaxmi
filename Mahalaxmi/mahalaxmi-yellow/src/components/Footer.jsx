import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing: ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email address");
    }
  };

  const footerStyles = {
    footer: {
      backgroundColor: "#000",
      color: "#fff",
      fontFamily: "'Arial', sans-serif",
      padding: "30px 20px 20px",
    },
    footerContent: {
      maxWidth: "1300px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "20px",
    },
    footerCol: {
      flex: "1",
      minWidth: "220px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
      textAlign: "left",
    },
    paragraph: {
      fontSize: "14px",
      lineHeight: "1.6",
      marginBottom: "20px",
      textAlign: "left",
    },
    subheading: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      textAlign: "left",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      textAlign: "left",
    },
    listItem: {
      marginBottom: "10px",
      fontSize: "14px",
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
      marginTop: "20px",
    },
    socialLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#34495e",
      color: "#fff",
      textDecoration: "none",
      fontSize: "18px",
    },
    newsletter: {
      display: "flex",
      marginTop: "15px",
    },
    input: {
      flex: "1",
      padding: "10px 15px",
      fontSize: "14px",
      border: "none",
      borderRadius: "4px 0 0 4px",
      outline: "none",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#e67e22",
      color: "#fff",
      border: "none",
      borderRadius: "0 4px 4px 0",
      cursor: "pointer",
      fontSize: "16px",
    },
    footerBottom: {
      textAlign: "center",
      marginTop: "40px",
      fontSize: "14px",
      borderTop: "1px solid #34495e",
      paddingTop: "20px",
    },
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.footerContent}>
        {/* Column 1: Brand */}
        <div style={footerStyles.footerCol}>
          <h1 style={footerStyles.heading}>MAHALAXMI</h1>
          <p style={footerStyles.paragraph}>
            Whether you're a home baker, a health enthusiast, or a modern
            homemaker, our flour mills are designed to suit every lifestyle.
            Experience the perfect blend of tradition and technology.
          </p>
          <div style={footerStyles.socialIcons}>
            <a href="#" style={footerStyles.socialLink} aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://m.facebook.com/mahalaxmichakki/" style={footerStyles.socialLink} aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" style={footerStyles.socialLink} aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/mahalaxmiattachakki_offical?igsh=ZnRycm1iMzZ6bmFm" style={footerStyles.socialLink} aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Column 2: Customer Support */}
        <div style={footerStyles.footerCol}>
          <h3 style={footerStyles.subheading}>Customer Support</h3>
          <ul style={footerStyles.list}>
            <li style={footerStyles.listItem}>Our Story</li>
            <li style={footerStyles.listItem}>Mission And Values</li>
            <li style={footerStyles.listItem}>
              <Link to="/about#team" style={{ color: "#fff", textDecoration: "none" }}>
                Meet the Team
              </Link>
            </li>
            <li style={footerStyles.listItem}>Brand Partnership</li>
            <li style={footerStyles.listItem}>
              <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Policies */}
        <div style={footerStyles.footerCol}>
          <h3 style={footerStyles.subheading}>Accessibility & Policies</h3>
          <ul style={footerStyles.list}>
            <li style={footerStyles.listItem}>Accessibility Statement</li>
            <li style={footerStyles.listItem}>Sitemap</li>
            <li style={footerStyles.listItem}>Privacy Policy</li>
            <li style={footerStyles.listItem}>Terms & Conditions</li>
            <li style={footerStyles.listItem}>Goods</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div style={footerStyles.footerCol}>
          <h3 style={footerStyles.subheading}>Stay Updated</h3>
          <p style={footerStyles.paragraph}>
            Sign up to get first dibs on new arrivals, sales, exclusive content,
            events, and more!
          </p>
          <div style={footerStyles.newsletter}>
            <input
              type="email"
              placeholder="Enter Your Email Address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={footerStyles.input}
            />
            <button onClick={handleSubscribe} style={footerStyles.button}>
              →
            </button>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={footerStyles.footerBottom}>
        ©2025 All Rights Reserved By Mahalaxmi. Designed by Noble Tech
      </div>
    </footer>
  );
};

export default Footer;
