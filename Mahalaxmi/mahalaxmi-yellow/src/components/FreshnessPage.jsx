import React from "react";
import "../styles/FreshnessPage.css";


import { FaTruck, FaShieldAlt, FaCreditCard, FaHeadset } from "react-icons/fa";

import freshnessImg from "../assets/c9.jpg";

const FreshnessPage = () => {
    return (
        <section className="freshness-section">
            <div className="freshness-container">

                <h1 className="freshness-heading">
                    Bring Freshness Straight<br />
                    <span className="freshness-subheading">to Your Plate</span>
                </h1>


                <div className="freshness-image-wrapper">
                    <img src={freshnessImg} alt="Freshness" />
                </div>


                <div className="freshness-features">
                    <div className="feature-item">
                        <FaTruck className="feature-icon" />
                        <div>
                            <h3>Free Shipping</h3>
                            <p>Free Shipping On Order</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <FaShieldAlt className="feature-icon" />
                        <div>
                            <h3>Money Guarantee</h3>
                            <p>Within 30 days exchange.</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <FaCreditCard className="feature-icon" />
                        <div>
                            <h3>Flexible Payment</h3>
                            <p>Pay with Multiple Credit Cards</p>
                        </div>
                    </div>

                    <div className="feature-item">
                        <FaHeadset className="feature-icon" />
                        <div>
                            <h3>Online Support</h3>
                            <p>24 hours a day, 7 days a week</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FreshnessPage;
