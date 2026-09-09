import React from 'react'
import { motion } from 'framer-motion'

const BikeLogo = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="3.5"/>
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h3"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const CreditCardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
)

const UpiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
)

const BankIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/>
    <path d="M3 10h18"/>
    <path d="M12 3l9 7H3l9-7z"/>
    <path d="M5 10v11"/>
    <path d="M9.5 10v11"/>
    <path d="M14.5 10v11"/>
    <path d="M19 10v11"/>
  </svg>
)

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff4757" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32V120H0V64Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3 style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <BikeLogo /> OwnRide
              </h3>
              <p>Your premium bike rental experience. Ride the future, today.</p>
              <div className="social-links">
                <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} aria-label="Instagram"><InstagramIcon /></motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} aria-label="Twitter"><TwitterIcon /></motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, y: -3 }} aria-label="LinkedIn"><LinkedInIcon /></motion.a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#home">Home</a>
              <a href="#bikes">Bikes</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-links">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Safety</a>
              <a href="#">Cancellation</a>
              <a href="#">FAQs</a>
            </div>

            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Subscribe for exclusive deals and updates.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
              © 2026 OwnRide. All rights reserved. Built with <HeartIcon />
            </p>
            <div className="payment-methods">
              <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><CreditCardIcon /> Razorpay</span>
              <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><UpiIcon /> UPI</span>
              <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}><BankIcon /> Net Banking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
