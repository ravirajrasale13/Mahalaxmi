import React, { useState } from "react";
import "../styles/DurableHero.css";
import durableBg from "../assets/f1.jpg"; // Make sure this image exists

const DurableHero = () => {
    const [showVideo, setShowVideo] = useState(false);

    const handleVideoOpen = () => setShowVideo(true);
    const handleVideoClose = () => setShowVideo(false);

    return (
        <section className="durable-hero-section">
            <div className="durable-image-wrapper">
                <img src={durableBg} alt="Durable Machinery" className="durable-bg" />

                <div className="durable-overlay">
                    <h1>Durable<br />Machinery</h1>
                    <button className="available-btn">Available Now</button>
                </div>

                <div className="watch-video-box" onClick={handleVideoOpen}>
                    <span className="watch-icon">▶</span>
                    <span className="watch-text">Watch Video</span>
                </div>

                {showVideo && (
                    <div className="video-modal">
                        <div className="video-content">
                            <span className="close-button" onClick={handleVideoClose}>✕</span>
                            <video controls autoPlay>
                                <source src="/video1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DurableHero;
