import React from "react";
import "../styles/FlourFeatures.css";

import featureImg from "../assets/c5.jpg";

// Icons
import { FaBolt, FaWeight, FaVolumeUp, FaTools } from "react-icons/fa";

const FlourFeatures = () => {
    return (
        <section className="flour-features-section">
            <div className="flour-features-container">

                <div className="flour-image-wrapper">
                    <div className="corner-box top-left-box"></div>
                    <div className="corner-box bottom-right-box"></div>
                    <img src={featureImg} alt="Flour Mill" />
                </div>


                <div className="flour-text-content">
                    <h1 className="flour-heading">
                        Healthy Flour Made
                        <span className="easy-text">Easy</span>
                    </h1>

                    <p className="flour-description">
                        Upgraded inside and out, our most advanced flour mill delivers faster,
                        finer grinding with zero mess—right in your kitchen.
                    </p>

                    <div className="features-list">
                        <div className="feature-item">
                            <FaBolt className="feature-icon" />
                            <h3>Powerful, Efficient Performance</h3>
                        </div>
                        <div className="feature-item">
                            <FaWeight className="feature-icon" />
                            <h3>Up to 10 Kg/Hour Capacity</h3>
                        </div>
                        <div className="feature-item">
                            <FaVolumeUp className="feature-icon" />
                            <h3>Low Noise, Compact Design</h3>
                        </div>
                        <div className="feature-item">
                            <FaTools className="feature-icon" />
                            <h3>Easy to Clean & Maintain</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlourFeatures;
