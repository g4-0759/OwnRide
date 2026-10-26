import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const cities = [
  { id: 'patiala', name: 'Patiala', emoji: '📍', available: 6 },
  { id: 'rajpura', name: 'Rajpura', emoji: '📍', available: 5 },
  { id: 'chandigarh', name: 'Chandigarh', emoji: '📍', available: 4 }
]

const bikesData = [
  {
    id: 1,
    name: "Royal Enfield Classic 350",
    category: "Cruiser",
    price: 1,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop&auto=format",
    specs: {
      engine: "349cc",
      power: "20.2 HP",
      mileage: "41 kmpl",
      topSpeed: "114 km/h"
    },
    features: ["ABS", "Digital Display", "USB Charging"],
    availableIn: ["Patiala", "Rajpura", "Chandigarh"]
  },
  {
    id: 2,
    name: "KTM Duke 390",
    category: "Naked",
    price: 1,
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&h=600&fit=crop&auto=format",
    specs: {
      engine: "373cc",
      power: "43 HP",
      mileage: "35 kmpl",
      topSpeed: "167 km/h"
    },
    features: ["TFT Display", "Quickshifter", "Ride Modes"],
    availableIn: ["Patiala", "Rajpura", "Chandigarh"]
  },
  {
    id: 3,
    name: "Yamaha MT-15",
    category: "Street",
    price: 1,
    rating: 4.6,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop&auto=format",
    specs: {
      engine: "155cc",
      power: "18.4 HP",
      mileage: "55 kmpl",
      topSpeed: "130 km/h"
    },
    features: ["VVA", "Assist Clutch", "LED Lights"],
    availableIn: ["Patiala", "Rajpura", "Chandigarh"]
  },
  {
    id: 4,
    name: "Harley Davidson Iron 883",
    category: "Cruiser",
    price: 1,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1558980664-60b0e6a8b18c?w=800&h=600&fit=crop&auto=format",
    specs: {
      engine: "883cc",
      power: "50 HP",
      mileage: "25 kmpl",
      topSpeed: "175 km/h"
    },
    features: ["Cruise Control", "Brembo Brakes", "Premium Sound"],
    availableIn: ["Patiala", "Chandigarh"]
  },
  {
    id: 5,
    name: "TVS Apache RTR 310",
    category: "Sport",
    price: 1,
    rating: 4.5,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop&auto=format",
    specs: {
      engine: "312cc",
      power: "33.5 HP",
      mileage: "38 kmpl",
      topSpeed: "150 km/h"
    },
    features: ["TTX Suspension", "Ride Modes", "Traction Control"],
    availableIn: ["Patiala", "Rajpura", "Chandigarh"]
  },
  {
    id: 6,
    name: "Ducati Monster 821",
    category: "Naked",
    price: 1,
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=800&h=600&fit=crop&auto=format&q=80",
    specs: {
      engine: "821cc",
      power: "112 HP",
      mileage: "19 kmpl",
      topSpeed: "202 km/h"
    },
    features: ["Cornering ABS", "TFT Display", "Ducati Traction"],
    availableIn: ["Rajpura", "Chandigarh"]
  }
]

const categories = ["All", "Cruiser", "Naked", "Street", "Sport"]

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const BikeCard = ({ bike, index, selectedCity }) => {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const isAvailable = bike.availableIn.includes(selectedCity)

  return (
    <motion.div
      className={`bike-card ${!isAvailable ? 'unavailable' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: isAvailable ? -10 : 0 }}
    >
      <div className="card-image-wrapper">
        {!imgError ? (
          <img
            src={bike.image}
            alt={bike.name}
            className="card-image"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="card-image-fallback">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="bike-svg-icon">
              <circle cx="5.5" cy="17.5" r="3.5"/>
              <circle cx="18.5" cy="17.5" r="3.5"/>
              <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
            </svg>
          </div>
        )}
        <div className="card-image-overlay"></div>
        <span className="bike-category-badge">{bike.category}</span>
        {!isAvailable && (
          <div className="unavailable-overlay">
            <span>Not available in {selectedCity}</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="bike-name">{bike.name}</h3>
          <div className="rating">
            <span className="star">★</span>
            <span>{bike.rating}</span>
            <span className="reviews">({bike.reviews})</span>
          </div>
        </div>

        <div className="bike-specs">
          <div className="spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spec-svg">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span>{bike.specs.power}</span>
          </div>
          <div className="spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spec-svg">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14v-6m0-4h.01"/>
            </svg>
            <span>{bike.specs.mileage}</span>
          </div>
          <div className="spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spec-svg">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span>{bike.specs.topSpeed}</span>
          </div>
        </div>

        <div className="bike-features">
          {bike.features.map((feature, i) => (
            <span key={i} className="feature-tag">{feature}</span>
          ))}
        </div>

        <div className="availability-info">
          <LocationIcon />
          <span>Available in: {bike.availableIn.join(", ")}</span>
        </div>

        <div className="card-footer">
          <div className="price">
            <span className="price-amount">₹{bike.price}</span>
            <span className="price-period">/hour</span>
          </div>
          <motion.button
            className={`book-btn ${!isAvailable ? 'disabled' : ''}`}
            whileHover={isAvailable ? { scale: 1.05 } : {}}
            whileTap={isAvailable ? { scale: 0.95 } : {}}
            onClick={() => isAvailable && navigate(`/book/${bike.id}`)}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Book Now' : 'Unavailable'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const BikeCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedCity, setSelectedCity] = useState("Patiala")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [availableOnly, setAvailableOnly] = useState(false)

  const filteredBikes = (activeCategory === "All"
    ? bikesData
    : bikesData.filter(bike => bike.category === activeCategory))
    .filter(bike => {
      const searchText = `${bike.name} ${bike.category} ${bike.specs.engine}`.toLowerCase()
      return searchText.includes(searchQuery.trim().toLowerCase())
    })
    .filter(bike => !availableOnly || bike.availableIn.includes(selectedCity))
    .sort((first, second) => {
      if (sortBy === "name") return first.name.localeCompare(second.name)
      if (sortBy === "mileage") {
        return parseInt(second.specs.mileage, 10) - parseInt(first.specs.mileage, 10)
      }
      return second.rating - first.rating
    })

  return (
    <section className="catalog" id="bikes">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Our Fleet</span>
          <h2 className="section-title">Choose Your Ride</h2>
          <p className="section-description">
            From powerful cruisers to agile street fighters, we have the perfect bike for every adventure.
          </p>
        </motion.div>

        {/* City Selector */}
        <motion.div
          className="city-selector"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="city-label">
            <LocationIcon />
            <span>Select Your City</span>
          </div>
          <div className="city-options">
            {cities.map((city) => (
              <motion.button
                key={city.id}
                className={`city-btn ${selectedCity === city.name ? 'active' : ''}`}
                onClick={() => setSelectedCity(city.name)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="city-name">{city.name}</span>
                <span className="city-availability">{city.available} bikes</span>
                {selectedCity === city.name && (
                  <motion.div
                    className="city-check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <CheckIcon />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="catalog-toolbar">
          <label className="catalog-search">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
              placeholder="Search bikes or engine size"
              aria-label="Search bikes by name, category, or engine size"
            />
          </label>
          <label className="catalog-sort">
            <span>Sort by</span>
            <select value={sortBy} onChange={event => setSortBy(event.target.value)} aria-label="Sort bikes">
              <option value="rating">Top rated</option>
              <option value="mileage">Best mileage</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
          <button
            type="button"
            className={`availability-toggle ${availableOnly ? 'active' : ''}`}
            onClick={() => setAvailableOnly(value => !value)}
            aria-pressed={availableOnly}
          >
            <span className="availability-toggle-indicator" />
            Available in {selectedCity}
          </button>
        </div>

        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <p className="catalog-results" aria-live="polite">
            Showing <strong>{filteredBikes.length}</strong> {filteredBikes.length === 1 ? 'bike' : 'bikes'}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ''}
            {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
        </p>

        <div className="bikes-grid">
            <AnimatePresence mode="wait">
              {filteredBikes.map((bike, index) => (
                <BikeCard key={bike.id} bike={bike} index={index} selectedCity={selectedCity} />
              ))}
            </AnimatePresence>
        </div>
        {filteredBikes.length === 0 && (
            <div className="catalog-empty-state">
              <span className="catalog-empty-icon">⌕</span>
              <h3>No bikes found</h3>
              <p>Try another search or update your filters to see more rides.</p>
              <button
                type="button"
                className="catalog-reset-btn"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("All")
                  setAvailableOnly(false)
                }}
              >
                Clear filters
              </button>
            </div>
        )}
      </div>
    </section>
  )
}

export default BikeCatalog
