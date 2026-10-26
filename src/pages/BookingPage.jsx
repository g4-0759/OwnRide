import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { saveReview } from '../utils/reviews'

const bikesData = {
  1: {
    id: 1,
    name: "Royal Enfield Classic 350",
    category: "Cruiser",
    price: 1,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop&auto=format",
    specs: { engine: "349cc", power: "20.2 HP", mileage: "41 kmpl", topSpeed: "114 km/h" }
  },
  2: {
    id: 2,
    name: "KTM Duke 390",
    category: "Naked",
    price: 1,
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&h=600&fit=crop&auto=format",
    specs: { engine: "373cc", power: "43 HP", mileage: "35 kmpl", topSpeed: "167 km/h" }
  },
  3: {
    id: 3,
    name: "Yamaha MT-15",
    category: "Street",
    price: 1,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop&auto=format",
    specs: { engine: "155cc", power: "18.4 HP", mileage: "55 kmpl", topSpeed: "130 km/h" }
  },
  4: {
    id: 4,
    name: "Harley Davidson Iron 883",
    category: "Cruiser",
    price: 1,
    image: "https://images.unsplash.com/photo-1558980664-60b0e6a8b18c?w=800&h=600&fit=crop&auto=format",
    specs: { engine: "883cc", power: "50 HP", mileage: "25 kmpl", topSpeed: "175 km/h" }
  },
  5: {
    id: 5,
    name: "TVS Apache RTR 310",
    category: "Sport",
    price: 1,
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop&auto=format",
    specs: { engine: "312cc", power: "33.5 HP", mileage: "38 kmpl", topSpeed: "150 km/h" }
  },
  6: {
    id: 6,
    name: "Ducati Monster 821",
    category: "Naked",
    price: 1,
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&h=600&fit=crop&auto=format&q=80",
    specs: { engine: "821cc", power: "112 HP", mileage: "19 kmpl", topSpeed: "202 km/h" }
  }
}

const BookingPage = () => {
  const { bikeId } = useParams()
  const navigate = useNavigate()
  const bike = bikesData[bikeId]

  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    duration: 1,
    date: '',
    pickupLocation: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [isDemoBooking, setIsDemoBooking] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [imgError, setImgError] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [isSavingReview, setIsSavingReview] = useState(false)
  const [reviewError, setReviewError] = useState('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (bookingData.name && bookingData.email && bookingData.phone) {
        setStep(2)
      }
    } else if (step === 2) {
      if (bookingData.date && bookingData.pickupLocation) {
        setStep(3)
      }
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentError('')
    const orderAmount = bike.price * bookingData.duration

    try {
      if (typeof window.Razorpay !== 'function') {
        throw new Error('Razorpay checkout did not load.')
      }

      const options = {
        key: "rzp_test_TbcyylXVuNeyyU",
        amount: orderAmount * 100,
        currency: "INR",
        name: "OwnRide Bike Rental",
        description: `Rent ${bike.name} for ${bookingData.duration} hour(s)`,
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&h=100&fit=crop&auto=format",
        handler: function (response) {
          console.log("Payment ID:", response.razorpay_payment_id)
          setPaymentSuccess(true)
          setIsProcessing(false)
        },
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone
        },
        notes: {
          bike_name: bike.name,
          duration: bookingData.duration,
          pickup_date: bookingData.date,
          pickup_location: bookingData.pickupLocation
        },
        theme: {
          color: "#ff6b35"
        },
        config: {
          display: {
            blocks: {
              utib: {
                name: "Pay using UPI",
                instruments: [
                  { method: "upi" }
                ]
              }
            },
            sequence: ["block.utib", "other"],
            preferences: {
              show_default_blocks: true
            }
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false)
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      setIsProcessing(false)
      setPaymentError('Razorpay could not be started. Try again or use the demo booking option below.')
    }
  }

  const handleDemoBooking = () => {
    setIsDemoBooking(true)
    setPaymentSuccess(true)
  }

  if (!bike) {
    return (
      <div className="booking-page">
        <div className="container">
          <h2>Bike not found</h2>
          <button onClick={() => navigate('/')}>Go back to home</button>
        </div>
      </div>
    )
  }

  if (paymentSuccess) {
    return (
      <div className="booking-page success-page">
        <div className="container">
          <motion.div
            className="success-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="success-checkmark"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
            >
              <div className="checkmark-icon">✓</div>
            </motion.div>
            <h2>{isDemoBooking ? 'Demo Booking Confirmed!' : 'Payment Successful!'}</h2>
            <p>Thank you for booking <strong>{bike.name}</strong></p>
            <div className="booking-summary">
              <div className="summary-item">
                <span>Duration:</span>
                <span>{bookingData.duration} hour(s)</span>
              </div>
              <div className="summary-item">
                <span>Pickup Date:</span>
                <span>{bookingData.date}</span>
              </div>
              <div className="summary-item">
                <span>Location:</span>
                <span>{bookingData.pickupLocation}</span>
              </div>
              <div className="summary-item total">
                <span>{isDemoBooking ? 'Demo total (not charged):' : 'Total Paid:'}</span>
                <span>₹{bike.price * bookingData.duration}</span>
              </div>
            </div>
            <p className="confirmation-email">
              {isDemoBooking
                ? 'This demo booking did not charge a payment method or send an email.'
                : <>A confirmation email has been sent to <strong>{bookingData.email}</strong></>}
            </p>
            <div className="booking-review">
              <h3>How was your ride?</h3>
              <p>Share a review of your {bike.name} booking.</p>
              {reviewSubmitted ? (
                <p className="review-success-message" role="status">
                  Thanks for your review! You can find it in the Reviews section.
                </p>
              ) : (
                <form
                  className="review-form"
                  onSubmit={async (event) => {
                    event.preventDefault()
                    const comment = reviewComment.trim()
                    if (!comment) {
                      setReviewError('Please write a few words about your ride.')
                      return
                    }

                    setIsSavingReview(true)
                    try {
                      await saveReview({
                        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                        name: bookingData.name,
                        bikeName: bike.name,
                        rating: reviewRating,
                        comment,
                        createdAt: new Date().toISOString()
                      })
                      setReviewSubmitted(true)
                      setReviewError('')
                    } catch (error) {
                      console.error('Could not save review:', error)
                      setReviewError(error instanceof Error
                        ? error.message
                        : 'Your review could not be saved. Please try again.')
                    } finally {
                      setIsSavingReview(false)
                    }
                  }}
                >
                  <fieldset className="review-rating-picker">
                    <legend>Your rating</legend>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className={rating <= reviewRating ? 'selected' : ''}
                          onClick={() => setReviewRating(rating)}
                          aria-label={`${rating} star${rating === 1 ? '' : 's'}`}
                          aria-pressed={reviewRating === rating}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <label className="review-comment-label" htmlFor="booking-review-comment">
                    Your review
                  </label>
                  <textarea
                    id="booking-review-comment"
                    value={reviewComment}
                    onChange={(event) => setReviewComment(event.target.value)}
                    placeholder="Tell us about your ride..."
                    rows={4}
                    maxLength={1000}
                    required
                  />
                  {reviewError && <p className="review-error" role="alert">{reviewError}</p>}
                  <button className="btn-primary" type="submit" disabled={isSavingReview}>
                    {isSavingReview ? 'Saving review...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
            <motion.button
              className="btn-primary success-home-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <div className="container">
        <motion.div
          className="booking-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="back-btn" onClick={() => navigate('/')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5m7-7-7 7 7 7"/>
            </svg>
            Back
          </button>
          <h1>Book Your Ride</h1>
        </motion.div>

        <div className="booking-content">
          <motion.div
            className="bike-preview"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="preview-card">
              {!imgError ? (
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="preview-image"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="preview-image-fallback">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="5.5" cy="17.5" r="3.5"/>
                    <circle cx="18.5" cy="17.5" r="3.5"/>
                    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
                  </svg>
                </div>
              )}
              <h3>{bike.name}</h3>
              <span className="preview-category">{bike.category}</span>
            </div>
            <div className="preview-specs">
              <div className="spec-item">
                <span className="spec-label">Engine</span>
                <span className="spec-value">{bike.specs.engine}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Power</span>
                <span className="spec-value">{bike.specs.power}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Mileage</span>
                <span className="spec-value">{bike.specs.mileage}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Top Speed</span>
                <span className="spec-value">{bike.specs.topSpeed}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="booking-form"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="steps-indicator">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`step ${step >= s ? 'active' : ''}`}>
                  <div className="step-number">{s}</div>
                  <span className="step-label">
                    {s === 1 ? 'Details' : s === 2 ? 'Schedule' : 'Payment'}
                  </span>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  className="form-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3>Your Details</h3>
                  <div className="form-group">
                    <label>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="label-icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="label-icon">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="label-icon">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <motion.button
                    className="btn-next"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                  >
                    Continue
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-7-7 7 7-7 7"/>
                    </svg>
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  className="form-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3>Schedule Your Ride</h3>
                  <div className="form-group">
                    <label>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="label-icon">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                        <line x1="16" x2="16" y1="2" y2="6"/>
                        <line x1="8" x2="8" y1="2" y2="6"/>
                        <line x1="3" x2="21" y1="10" y2="10"/>
                      </svg>
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="label-icon">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      Duration (hours)
                    </label>
                    <select
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleInputChange}
                    >
                      <option value={1}>1 Hour</option>
                      <option value={2}>2 Hours</option>
                      <option value={4}>4 Hours</option>
                      <option value={8}>8 Hours (Full Day)</option>
                      <option value={24}>24 Hours</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="label-icon">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      Pickup Location
                    </label>
                    <select
                      name="pickupLocation"
                      value={bookingData.pickupLocation}
                      onChange={handleInputChange}
                    >
                      <option value="">Select your city</option>
                      <option value="Patiala">Patiala</option>
                      <option value="Rajpura">Rajpura</option>
                      <option value="Chandigarh">Chandigarh</option>
                    </select>
                  </div>
                  <div className="btn-group">
                    <motion.button
                      className="btn-back"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(1)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5m7-7-7 7 7 7"/>
                      </svg>
                      Back
                    </motion.button>
                    <motion.button
                      className="btn-next"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextStep}
                    >
                      Continue
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </motion.button>
                  </div>
                  {paymentError && <p className="payment-error" role="alert">{paymentError}</p>}
                  <button
                    type="button"
                    className="btn-demo-booking"
                    onClick={handleDemoBooking}
                  >
                    Continue with demo booking (no payment)
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  className="form-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3>Payment Summary</h3>
                  <div className="payment-summary">
                    <div className="summary-row">
                      <span>Bike Rental</span>
                      <span>₹{bike.price} × {bookingData.duration} hr</span>
                    </div>
                    <div className="summary-row">
                      <span>Security Deposit</span>
                      <span>₹0 (waived)</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total Amount</span>
                      <span className="total-amount">₹{bike.price * bookingData.duration}</span>
                    </div>
                  </div>

                  <div className="booking-details-summary">
                    <p><strong>Bike:</strong> {bike.name}</p>
                    <p><strong>Date:</strong> {bookingData.date}</p>
                    <p><strong>Duration:</strong> {bookingData.duration} hour(s)</p>
                    <p><strong>Location:</strong> {bookingData.pickupLocation}</p>
                  </div>

                  <div className="upi-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    <span>UPI payments supported — Pay with GPay, PhonePe, Paytm & more</span>
                  </div>

                  <div className="btn-group">
                    <motion.button
                      className="btn-back"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5m7-7-7 7 7 7"/>
                      </svg>
                      Back
                    </motion.button>
                    <motion.button
                      className="btn-pay"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(255, 107, 53, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="spinner">Processing...</span>
                      ) : (
                        <>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                          </svg>
                          Pay ₹{bike.price * bookingData.duration} via Razorpay
                        </>
                      )}
                    </motion.button>
                  </div>
                  {paymentError && <p className="payment-error" role="alert">{paymentError}</p>}
                  <button
                    type="button"
                    className="btn-demo-booking"
                    onClick={handleDemoBooking}
                  >
                    Continue with demo booking (no payment)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
