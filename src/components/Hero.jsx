import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const cities = [
  { name: "Patiala", bikes: 6 },
  { name: "Rajpura", bikes: 5 },
  { name: "Chandigarh", bikes: 4 }
]

const Hero = () => {
  const ref = useRef(null)
  const [imgError, setImgError] = useState(false)
  const [selectedCity, setSelectedCity] = useState("Patiala")

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  return (
    <section ref={ref} className="hero" id="home">
      <motion.div className="hero-bg" style={{ y, scale }}>
        {!imgError ? (
          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&h=1080&fit=crop&auto=format"
            alt="Motorcycle Background"
            className="hero-bg-image"
            onError={() => setImgError(true)}
          />
        ) : null}
        <div className="hero-gradient"></div>
        <div className="hero-grid-pattern"></div>
        <div className="hero-particles">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
                x: Math.random() * 80 - 40,
                y: Math.random() * 80 - 40
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-text"
        >
          <motion.div variants={textVariants} className="hero-badge">
            <span className="badge-dot"></span>
            Premium Bike Rentals
          </motion.div>

          <motion.h1 variants={textVariants} className="hero-title">
            <span className="title-line">Ride the</span>
            <span className="title-line gradient-text">Future</span>
            <span className="title-line">Today</span>
          </motion.h1>

          <motion.p variants={textVariants} className="hero-description">
            Experience the thrill of premium 2-wheelers at unbeatable prices.
            Book your ride in seconds, pay securely with Razorpay.
          </motion.p>

          {/* City Quick Selector */}
          <motion.div variants={textVariants} className="hero-city-selector">
            <span className="city-select-label">Select Your City:</span>
            <div className="city-select-options">
              {cities.map((city) => (
                <motion.button
                  key={city.name}
                  className={`city-select-btn ${selectedCity === city.name ? 'active' : ''}`}
                  onClick={() => setSelectedCity(city.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {city.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={textVariants} className="hero-buttons">
            <motion.a
              href="#bikes"
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255, 107, 53, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Bikes</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>

            <motion.a
              href="#about"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>

          <motion.div variants={textVariants} className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Riders</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Premium Bikes</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Cities</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="hero-bike-showcase">
            <motion.div
              className="hero-bike-glow"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            {!imgError ? (
              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop&auto=format"
                alt="Premium Motorcycle"
                className="hero-bike-image"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="hero-bike-fallback">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5.5" cy="17.5" r="3.5"/>
                  <circle cx="18.5" cy="17.5" r="3.5"/>
                  <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll Down</span>
      </motion.div>
    </section>
  )
}

export default Hero
