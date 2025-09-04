import React, { useState } from "react";
import "../styles/Faq.css"; // for styling
import faqBanner from "../assets/faq-banner.png"; // ✅ update with your uploaded image name

const faqs = [
  {
    question: "What is an Attachakki?",
    answer: "An Attachakki is a domestic flour mill used for grinding wheat and other grains at home."
  },
  {
    question: "Do you provide warranty on products?",
    answer: "Yes, all our Attachakkis come with a standard warranty. Please check individual product details."
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 5-7 business days depending on your location."
  },
  {
    question: "Do you offer installation support?",
    answer: "Yes, we provide installation and demo support either in person or via call/video."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a hassle-free return policy. If you’re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Please refer to our Returns & Exchanges page for detailed instructions."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is shipped, you’ll receive a tracking number via email or SMS. You can use it to track your order in real-time."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit/debit cards, net banking, UPI, and popular digital wallets for secure payments."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship internationally. Shipping costs and delivery times vary depending on the destination."
  },
  {
    question: "How can I contact your customer support?",
    answer: "You can reach our customer support team via email, phone, or live chat on our website."
  },
  {
    question: "Are the sizes true to measurements?",
    answer: "Yes, we ensure that our product sizes match the measurement guides provided on the product pages."
  },
  {
    question: "Can I modify or cancel my order after it's been placed?",
    answer: "Orders can be modified or canceled within 24 hours of placement. Please contact support as soon as possible."
  },
  {
    question: "Do you offer gift wrapping services?",
    answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option during the checkout process."
  },
  {
    question: "How do I care for my garments?",
    answer: "Care instructions are provided on the product labels and on our website. Follow them to ensure longevity."
  },
  {
    question: "Do you offer online ordering and shipping?",
    answer: "Yes, you can order directly from our website, and we’ll deliver to your doorstep."
  },
  {
    question: "Can I sign up for exclusive offers and updates?",
    answer: "Absolutely! Subscribe to our newsletter to receive exclusive offers, updates, and discounts."
  },
  {
    question: "How do I create an account?",
    answer: "Click on the 'Sign Up' button on the top right corner of our website and follow the simple steps to create your account."
  },
  {
    question: "What if an item I want is out of stock?",
    answer: "You can sign up for restock notifications on the product page, and we’ll notify you once the item is available again."
  },
  {
    question: "Can I change my shipping address after placing an order?",
    answer: "Yes, you can change your shipping address within 24 hours of placing your order by contacting our support team."
  }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      {/* ✅ Banner Section */}
      <div className="faq-banner">
        <img src={faqBanner} alt="FAQs Banner" className="faq-banner-img" />
        <div className="faq-banner-content">
          <h1>FAQs</h1>
          <p>
            <a href="/">Home</a> / FAQs
          </p>
        </div>
      </div>

      {/* ✅ FAQ Accordion */}
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "active" : ""}`}
            >
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
                <span className="faq-toggle">{openIndex === index ? "-" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
