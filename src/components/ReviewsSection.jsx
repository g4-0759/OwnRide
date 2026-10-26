import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { loadReviews, migrateLocalReviews } from '../utils/reviews'

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([])
  const [loadError, setLoadError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        await migrateLocalReviews()
        setReviews(await loadReviews())
      } catch (error) {
        console.error('Could not load reviews:', error)
        setLoadError(error instanceof Error
          ? error.message
          : 'Reviews could not be loaded. Check the Supabase configuration and try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Rider Feedback</span>
          <h2 className="section-title">Reviews</h2>
          <p className="section-description">
            Hear from riders who have booked with OwnRide.
          </p>
        </motion.div>

        {isLoading ? (
          <p className="reviews-message" role="status">Loading reviews...</p>
        ) : loadError ? (
          <p className="reviews-message" role="alert">{loadError}</p>
        ) : reviews.length === 0 ? (
          <p className="reviews-message">
            No reviews yet. Complete a booking and share your experience.
          </p>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.id}>
                <div className="review-card-header">
                  <div>
                    <h3>{review.name}</h3>
                    <p>{review.bikeName}</p>
                  </div>
                  <span className="review-rating" aria-label={`${review.rating} out of 5 stars`}>
                    {'★'.repeat(review.rating)}
                    <span className="review-rating-empty">{'☆'.repeat(5 - review.rating)}</span>
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <time className="review-date" dateTime={review.createdAt}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </time>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ReviewsSection
