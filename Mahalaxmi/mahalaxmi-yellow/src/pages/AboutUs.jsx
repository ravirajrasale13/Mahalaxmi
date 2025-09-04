import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../styles/AboutUs.css";

// ✅ Import images
import aboutImage from "../assets/aboutus.jpg";
import trustImage from "../assets/about.jpg"; 
import team1 from "../assets/teammember.jpg";
import team2 from "../assets/teammember.jpg";
import team3 from "../assets/teammember.jpg";
import team4 from "../assets/teammember.jpg";
import team5 from "../assets/teammember.jpg"; 

const AboutUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const teamRef = useRef(null);
  const location = useLocation();

  // ✅ Smooth scroll if URL has #team
  useEffect(() => {
    if (location.hash === "#team") {
      const teamSection = document.getElementById("team");
      if (teamSection) {
        teamSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Team members
  const teamMembers = [
    { img: team1, name: "Ramesh Kumar", role: "Founder & CEO" },
    { img: team2, name: "Priya Sharma", role: "Head of Operations" },
    { img: team3, name: "Amit Verma", role: "Customer Support Lead" },
    { img: team4, name: "Sunita Patel", role: "Marketing Head" },
    { img: team5, name: "Rajesh Singh", role: "Sales Manager" },
  ];

  // Testimonials (5 total)
  const testimonials = [
    {
      stars: "★★★★★",
      title: "Customer Support",
      text: "Customer support was amazingly fast, personal response via call and helped me within minutes, thank you so much!!",
      name: "Amit Sharma",
      role: "Founder & CEO",
    },
    {
      stars: "★★★★★",
      title: "Quality Product",
      text: "Fresh flour at home has changed our lifestyle! The machine is reliable and so easy to use.",
      name: "Rahul Verma",
      role: "Home Baker",
    },
    {
      stars: "★★★★★",
      title: "Great Experience",
      text: "Excellent quality and durable machine. The team provided amazing guidance during installation.",
      name: "Priya Sharma",
      role: "Health Enthusiast",
    },
    {
      stars: "★★★★★",
      title: "Highly Recommended",
      text: "Worth every penny! Smooth performance and professional customer service.",
      name: "Amit Kumar",
      role: "Entrepreneur",
    },
    {
      stars: "★★★★★",
      title: "Value for Money",
      text: "Fantastic experience, affordable pricing and very reliable flour mill for daily use.",
      name: "Neha Gupta",
      role: "Modern Homemaker",
    },
  ];

  // Auto-scroll every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // ✅ Infinite loop handling
  const getVisibleTestimonials = () => {
    const extended = [...testimonials, ...testimonials];
    return extended.slice(currentIndex, currentIndex + 3);
  };

  // ✅ Scroll team section
  const scroll = (direction) => {
    if (!teamRef.current) return;
    const container = teamRef.current;
    const scrollAmount = 300;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="about-section">
      <div className="about-container">
        {/* 🔹 Banner */}
        <div className="about-image-wrapper">
          <img src={aboutImage} alt="About Mahalaxmi Attachakki" className="about-image" />
          <button className="watch-video-btn" onClick={() => setShowVideo(true)}>▶ Watch Video</button>
        </div>

        {/* 🔹 Passion */}
        <div className="passion-section">
          <div className="passion-left">
            <img src={trustImage} alt="18 Years of Trust" />
          </div>
          <div className="passion-right">
            <h2><span className="dot">●</span> Mahalaxmi The Passion</h2>
            <p>
              Dealing in Mahalaxmi Attachakki is not just business.. it’s our passion. 
              We expect the same passion in our outlets also. We are not just selling 
              Attachakki, we are building a family to serve customers for a lifetime.
            </p>
          </div>
        </div>

        {/* 🔹 Video Modal */}
        {showVideo && (
          <div className="video-modal">
            <span className="close-modal" onClick={() => setShowVideo(false)}>✖</span>
            <video src="/video1.mp4" controls autoPlay />
          </div>
        )}

        {/* 🔹 Counter */}
        <div className="counter-section">
          <div className="counter-box"><h3>10+</h3><p>Years of Experience</p></div>
          <div className="counter-box"><h3>5000+</h3><p>Happy Clients</p></div>
          <div className="counter-box"><h3>50+</h3><p>Cities Served</p></div>
          <div className="counter-box"><h3>100%</h3><p>Quality Assurance</p></div>
        </div>

        {/* 🔹 Team */}
        <div className="team-section" id="team">
          <h2>Meet Our Team</h2>
          <button className="scroll-btn left" onClick={() => scroll("left")}>←</button>
          <button className="scroll-btn right" onClick={() => scroll("right")}>→</button>
          <div className="team-container" ref={teamRef}>
            {teamMembers.map((member, index) => (
              <div className="team-member" key={index}>
                <div className="team-image">
                  <img src={member.img} alt={member.name} />
                  <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                  </div>
                </div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Testimonials Carousel */}
        <div className="testimonials-section">
          <h2>Testimonials</h2>
          <div className="testimonial-carousel">
            {getVisibleTestimonials().map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="stars">{t.stars}</div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <h4>{t.name}</h4>
                <p className="client-role">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === currentIndex % testimonials.length ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
