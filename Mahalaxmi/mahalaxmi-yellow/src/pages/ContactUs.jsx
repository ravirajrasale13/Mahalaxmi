import React, { useState } from "react";
import "../styles/ContactUs.css";
import contactImg from "../assets/contactuss.jpg"; // ✅ import image

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      {/* Image Section */}
      <div className="contact-image-wrapper">
        <img src={contactImg} alt="Contact Us" className="contact-image" />
      </div>

      {/* Info Section */}
      <div className="contact-info">
        <div className="info-box">
          <h3>Customer Care</h3>
          <p>📞 +91 98765 43210</p>
          <p>📧 support@mahalaxmiAttachakki.com</p>
          <p>Mon - Sat: 9:00 AM to 7:00 PM</p>
        </div>

        <div className="info-box">
          <h3>Repair & Service</h3>
          <p>📞 +91 91234 56789</p>
          <p>📧 service@mahalaxmiAttachakki.com</p>
          <p>Available for doorstep service in major cities</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-container">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Map Section (Mahalaxmi Attachakki Pinned) */}
      <div className="map-container">
<iframe
  width="100%"
  height="450"
  style={{ border: 0, borderRadius: "12px" }}
  loading="lazy"
  allowFullScreen=""
  referrerPolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps?q=Mahalaxmi%20Aatachaki,%20Ram%20Mandir%20Rd,%20near%20Congress%20Bhavan,%20Khanbhag,%20Sangli,%20Sangli%20Miraj%20Kupwad,%20Maharashtra%20416416&hl=en&z=15&output=embed"
></iframe>


        <div className="map-direction">
          <a
            href="https://maps.google.com/?q=Mahalaxmi+Attachakki"
            target="_blank"
            rel="noopener noreferrer"
            className="direction-button"
          >
            📍 Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
