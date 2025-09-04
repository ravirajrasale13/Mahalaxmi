import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const userRef = useRef(null);
  const shopRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // ✅ Load user instantly when localStorage changes
  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    loadUser(); // run once on mount
    window.addEventListener("userUpdated", loadUser); // listen for login/register
    return () => window.removeEventListener("userUpdated", loadUser);
  }, []);

  // Toggle functions
  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
    setShowSearch(false);
    setShowShopDropdown(false);
  };

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setShowUserDropdown(false);
    setShowShopDropdown(false);
  };

  const isNoHoverDevice = () =>
    typeof window !== "undefined" &&
    (window.matchMedia?.("(hover: none)").matches || window.innerWidth <= 768);

  const openShopDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setShowShopDropdown(true);
  };

  const closeShopDropdownWithDelay = (delay = 180) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setShowShopDropdown(false);
      closeTimeoutRef.current = null;
    }, delay);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSearch(false);
      if (userRef.current && !userRef.current.contains(e.target))
        setShowUserDropdown(false);
      if (shopRef.current && !shopRef.current.contains(e.target))
        setShowShopDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">Free Shipping on Attachakki Orders</div>

      <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        {/* Mobile Menu Toggle */}
        <div
          className="mobile-menu-icon"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Left Nav */}
        <ul className={`nav-left ${isMobileMenuOpen ? "mobile-active" : ""}`}>
          <li className={`nav-item ${isActive("/") ? "active-left" : ""}`}>
            <Link to="/">Home</Link>
          </li>

          {/* Product Dropdown */}
          <li
            className={`nav-item shop-dropdown ${
              location.pathname.startsWith("/shop") ? "active-left" : ""
            }`}
            ref={shopRef}
            onMouseEnter={() => !isNoHoverDevice() && openShopDropdown()}
            onMouseLeave={() =>
              !isNoHoverDevice() && closeShopDropdownWithDelay(180)
            }
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/shop");
                if (isNoHoverDevice()) {
                  setShowShopDropdown((prev) => !prev);
                }
              }}
            >
              Product{" "}
              <FaChevronDown
                className={`dropdown-icon ${showShopDropdown ? "rotated" : ""}`}
              />
            </span>

            <ul
              className={`dropdown-menu ${showShopDropdown ? "active" : ""}`}
              onMouseEnter={() => !isNoHoverDevice() && openShopDropdown()}
              onMouseLeave={() =>
                !isNoHoverDevice() && closeShopDropdownWithDelay(180)
              }
            >
              <li>
                <Link to="/shop/4g">4G Attachakki</Link>
              </li>
              <li>
                <Link to="/shop/5g">5G Attachakki</Link>
              </li>
              <li>
                <Link to="/shop/hybrid">Hybrid Attachakki</Link>
              </li>
              <li>
                <Link to="/shop/carnival">Carnival Attachakki</Link>
              </li>
            </ul>
          </li>

          <li className={`nav-item ${isActive("/about") ? "active-left" : ""}`}>
            <Link to="/about">About Us</Link>
          </li>
          <li
            className={`nav-item ${isActive("/contact") ? "active-left" : ""}`}
          >
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className={`nav-item ${isActive("/faq") ? "active-left" : ""}`}>
            <Link to="/faq">FAQs</Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="nav-center">
          <Link to="/">
            <img src={logo} alt="Mahalaxmi Logo" className="logo-image" />
          </Link>
        </div>

        {/* Right Icons */}
        <div className="nav-right">
          {/* Search */}
          <div className="search-container" ref={searchRef}>
            <FaSearch
              onClick={toggleSearch}
              className={`icon ${showSearch ? "active" : ""}`}
            />
            {showSearch && (
              <div className="search-box-wrapper">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* User */}
          <div className="user-dropdown" ref={userRef}>
            <span onClick={toggleUserDropdown} style={{ cursor: "pointer" }}>
              <FaUser className={`icon ${showUserDropdown ? "active" : ""}`} />
              {user && <span className="user-name">Hi, {user.name}</span>}
            </span>

            {showUserDropdown && (
              <ul className="dropdown-menu">
                {user ? (
                  <>
                    <li className="dropdown-heading">Welcome, {user.name}</li>
                     {/*<li>
                      <Link to="/profile">Profile</Link>
                    </li>{*/}
                    <li>
                      <button
                        onClick={() => {
                          localStorage.removeItem("user");
                          setUser(null);
                          navigate("/login");
                          window.dispatchEvent(new Event("userUpdated")); // 🔥 update instantly on logout
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="dropdown-heading">Account</li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          {/* Cart Drawer */}
          <div
            className="cart-icon"
            onClick={() => setShowCartDrawer(true)}
            style={{ cursor: "pointer" }}
          >
            <FaShoppingBag
              className={`icon ${
                location.pathname.startsWith("/cart") ? "active" : ""
              }`}
            />
            {cart.length > 0 && (
              <span className="cart-badge">{cart.length}</span>
            )}
          </div>
        </div>
      </nav>

      {/* CART OVERLAY */}
      {showCartDrawer && (
        <div
          className="cart-overlay"
          onClick={() => setShowCartDrawer(false)}
        ></div>
      )}

      {/* CART DRAWER */}
      <div className={`cart-drawer ${showCartDrawer ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <FaTimes
            className="close-btn"
            onClick={() => setShowCartDrawer(false)}
          />
        </div>

        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div>
                  <p>{item.name}</p>
                  <p>
                    {item.quantity} × ₹{item.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-total">
            <p>
              Subtotal:{" "}
              <strong>
                ₹
                {cart
                  .reduce((total, item) => {
                    const price =
                      typeof item.price === "string"
                        ? parseFloat(item.price.replace(/[^\d.-]/g, ""))
                        : item.price;
                    return total + price * item.quantity;
                  }, 0)
                  .toFixed(2)}
              </strong>
            </p>
          </div>
        )}

        <div className="cart-drawer-footer">
          <button
            onClick={() => {
              setShowCartDrawer(false);
              navigate("/cart");
            }}
            className="view-cart-btn"
          >
            View Cart
          </button>
          <button
            onClick={() => {
              setShowCartDrawer(false);
              navigate("/checkout");
            }}
            className="checkout-btn"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
