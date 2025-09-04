// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImageCards from "./components/ImageCards";
import DurableHero from "./components/DurableHero";
import FlourFeatures from "./components/FlourFeatures";
import FreshnessPage from "./components/FreshnessPage";
import ProductDetail from "./components/ProductDetail";
import BackToTop from "./components/BackToTop";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CartPage from "./pages/CartPage";
import ShopPage from "./pages/ShopPage";
import Faq from "./pages/Faq";
import ImageInfo from "./pages/ImageInfo";
import Checkout from "./pages/Checkout";
import { ToastContainer } from "react-toastify";

// ✅ Wrapper for routes so we can track location
const AppRoutes = () => {
  const location = useLocation();

  // 🔥 Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <>
            <HomePage />
            <ImageCards />
            <DurableHero />
            <FlourFeatures />
            <FreshnessPage />
          </>
        }
      />

      {/* Product Detail */}
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* Auth */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />

      {/* Static Pages */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/faq" element={<Faq />} />

      {/* Shop */}
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:category" element={<ShopPage />} />

      {/* Other */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/image-info/:id" element={<ImageInfo />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

const App = () => {
  // ✅ Ensure page is at top after refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const goTop = () => {
      const wrapper = document.querySelector(".page-wrapper");
      if (wrapper) wrapper.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    requestAnimationFrame(goTop);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // ✅ Animate images on scroll
  useEffect(() => {
    const elements = document.querySelectorAll(
      "img.scroll-reveal, img.scroll-fade-in"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (!el.classList.contains("no-effect")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <AppRoutes /> {/* ✅ all routes with scroll reset */}
      </div>
      <Footer />
      <BackToTop />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
