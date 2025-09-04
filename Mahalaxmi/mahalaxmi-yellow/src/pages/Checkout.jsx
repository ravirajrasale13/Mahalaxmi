import React, { useEffect, useMemo, useState } from "react";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QRCode from "qrcode";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, buyNowItem } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [customerUpiId, setCustomerUpiId] = useState("");
  const [qrSrc, setQrSrc] = useState("");
  const [isQrLoading, setIsQrLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    state: "",
    city: "",
    pinCode: "",
    phone: "",
    note: "",
    addNote: false,
  });

  // Env variables
  const shopUpiId = import.meta.env.VITE_SHOP_UPI_ID || "yourshop@upi";
  const razorpayKey =
    import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_abc123xyz456";

  // helpers
  const toNumber = (v) => {
    if (typeof v === "number") return v;
    const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : 0;
  };

  const sanitizeString = (str) => String(str).replace(/[<>]/g, "");

  // ✅ Merge cart items + buyNow item
  const checkoutItems = [...cart, ...(buyNowItem ? [buyNowItem] : [])];

  const totalPrice = useMemo(
    () =>
      checkoutItems.reduce(
        (total, item) =>
          total + toNumber(item.price) * (Number(item.quantity) || 0),
        0
      ),
    [checkoutItems]
  );

  const formatINR = (n) =>
    toNumber(n).toLocaleString("en-IN", { maximumFractionDigits: 2 });

  const upiLink = useMemo(() => {
    return `upi://pay?pa=${encodeURIComponent(
      shopUpiId
    )}&pn=${encodeURIComponent("My Shop")}&am=${toNumber(totalPrice)}&cu=INR`;
  }, [shopUpiId, totalPrice]);

  // QR generation for UPI
  useEffect(() => {
    if (paymentMethod === "upi") {
      setIsQrLoading(true);
      QRCode.toDataURL(upiLink)
        .then((url) => {
          setQrSrc(url);
          setIsQrLoading(false);
        })
        .catch((err) => {
          console.error("QR Generation Error:", err);
          setIsQrLoading(false);
          setErrors((prev) => ({
            ...prev,
            qrCode: "Failed to generate QR code",
          }));
        });
    } else {
      setQrSrc("");
      setIsQrLoading(false);
    }
  }, [upiLink, paymentMethod]);

  // Optional: fallback loader in case script tag missing
  const ensureRazorpay = async () => {
    if (window.Razorpay) return true;
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const copy = async (text, label = "Copied!") => {
    try {
      await navigator.clipboard.writeText(text);
      alert(label);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert(label);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pinCode.match(/^[0-9]{6}$/)) {
      newErrors.pinCode = "PIN code must be 6 digits";
    }
    if (!formData.phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (
      paymentMethod === "upi" &&
      !customerUpiId.match(/^[\w.-]+@[\w.-]+$/)
    ) {
      newErrors.upiId = "Please enter a valid UPI ID (e.g., example@upi)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderId = () =>
    `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: sanitizeString(value) }));
  };

  // Razorpay handler (Card/UPI/Netbanking/Wallets)
  const handleRazorpayPayment = async () => {
    const ok = await ensureRazorpay();
    if (!ok || !window.Razorpay) {
      alert("Unable to load Razorpay. Please check your internet or script tag.");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: Math.round(toNumber(totalPrice) * 100), // paise
      currency: "INR",
      name: "My Shop",
      description: "Order Payment",
      handler: function (response) {
        console.log("Razorpay success:", response);
        setOrderId(generateOrderId());
        setShowModal(true);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pinCode}`,
      },
      theme: { color: "#3399cc" },
      modal: {
        ondismiss: function () {
          console.log("Razorpay modal dismissed");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Card path -> Razorpay Checkout
    if (paymentMethod === "card") {
      await handleRazorpayPayment();
      return;
    }

    // COD & UPI (QR-based) just confirm locally for demo
    const data = {
      orderId: generateOrderId(),
      paymentMethod,
      customerUpiId: paymentMethod === "upi" ? customerUpiId : null,
      items: checkoutItems,
      totalPrice,
      billingInfo: formData,
    };

    console.log("Order Data:", data);
    setOrderId(data.orderId);
    setShowModal(true);
  };

  
  return (
    <div className="checkout-wrapper">
      {/* Left Side */}
      <div className="checkout-left">
        <div className="checkout-container">
          <h1 className="checkout-title">Checkout</h1>

          <form onSubmit={handleSubmit}>
            {/* Payment Methods */}
            <div className="payment-methods">
              <h2>Select Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="radio-label cod-label">💵 Cash on Delivery</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="radio-label">📱 UPI (QR Code)</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="radio-label">
                  💳 Card / NetBanking / Wallets (Razorpay)
                </span>
              </label>
            </div>

            {/* UPI Section */}
            {paymentMethod === "upi" && (
              <div className="checkout-section">
                <h3>Enter Your UPI ID (for records)</h3>
                <div className="input-row">
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="example@upi"
                    pattern="^[\\w.-]+@[\\w.-]+$"
                    value={customerUpiId}
                    onChange={(e) =>
                      setCustomerUpiId(sanitizeString(e.target.value))
                    }
                    required
                  />
                  {errors.upiId && <p className="error">{errors.upiId}</p>}
                </div>

                {isQrLoading ? (
                  <p>Loading QR Code...</p>
                ) : qrSrc ? (
                  <div className="upi-payment-section">
                    <h3>Scan QR Code to Pay</h3>
                    <img
                      src={qrSrc}
                      width={220}
                      height={220}
                      alt="UPI QR Code"
                      className="upi-qr-img"
                    />
                    {errors.qrCode && <p className="error">{errors.qrCode}</p>}
                    <p>Or use these apps to pay:</p>
                    <div className="upi-app-links">
                      <a
                        href={upiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="upi-app-link"
                      >
                        Open in UPI App
                      </a>
                      <button
                        type="button"
                        className="upi-app-link"
                        onClick={() =>
                          copy(upiLink, "UPI payment link copied!")
                        }
                      >
                        Copy UPI Link
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>Failed to generate QR code.</p>
                )}
              </div>
            )}

            {/* Contact Info */}
            <div className="checkout-section">
              <h2>Contact Information</h2>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="checkout-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Billing Address */}
            <div className="checkout-section">
              <h2>Billing Address</h2>

              <select
                name="country"
                className="checkout-input"
                value={formData.country || "India"}
                onChange={handleInputChange}
                required
              >
                <option value="India">India</option>
              </select>

              <div className="input-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="checkout-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="checkout-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                className="checkout-input"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              {errors.address && <p className="error">{errors.address}</p>}

              <input
                type="text"
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                className="checkout-input"
                value={formData.apartment}
                onChange={handleInputChange}
              />

              <div className="input-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="checkout-input"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                {errors.city && <p className="error">{errors.city}</p>}

                <select
                  name="state"
                  className="checkout-input"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                </select>
                {errors.state && <p className="error">{errors.state}</p>}
              </div>

              <div className="input-row">
                <input
                  type="text"
                  name="pinCode"
                  placeholder="PIN Code"
                  className="checkout-input"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  required
                />
                {errors.pinCode && <p className="error">{errors.pinCode}</p>}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="checkout-input"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
            </div>

            {/* Order Notes */}
            <div className="checkout-section">
              <label className="note-checkbox">
                <input
                  type="checkbox"
                  name="addNote"
                  checked={formData.addNote}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      addNote: e.target.checked,
                    }))
                  }
                />
                Add a note to your order
              </label>

              {formData.addNote && (
                <textarea
                  name="note"
                  placeholder="Notes about your order."
                  className="checkout-input"
                  value={formData.note}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                />
              )}
            </div>

            {/* Buttons */}
            <div className="checkout-buttons">
              <button
                type="button"
                className="back-btn"
                onClick={() => navigate("/cart")}
              >
                Return to Cart
              </button>
              <button type="submit" className="place-order-btn">
                {paymentMethod === "card" ? "Pay with Razorpay" : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="checkout-right">
        <h2>Order Summary</h2>
        {checkoutItems.map((item, index) => {
          const price = toNumber(item.price);
          const qty = Number(item.quantity) || 0;
          const line = price * qty;
          return (
            <div key={index} className="summary-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="summary-details">
                <p className="summary-name">{item.name}</p>
                <p className="summary-price">₹{formatINR(price)}</p>
                <p>Qty: {qty}</p>
              </div>
              <p className="summary-line-price">₹{formatINR(line)}</p>
            </div>
          );
        })}
        <div className="summary-row summary-total">
          <span>Total</span>
          <span>₹{formatINR(totalPrice)}</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>“Order Placed Successfully 🎉”</h3>
            <p>Order ID: {orderId}</p>
            <p>Payment Method: {paymentMethod.toUpperCase()}</p>
            <p>Total: ₹{formatINR(totalPrice)}</p>
            <button onClick={() => navigate("/")}>Confirm</button>
            <button onClick={() => setShowModal(false)}>Edit Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
