const LEGACY_REVIEWS_STORAGE_KEY = 'ownride-reviews'
const REVIEW_COLUMNS = 'id,name,bike_name,rating,comment,created_at'

const getSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '')
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable shared reviews.')
  }

  return { url, anonKey }
}

const requestReviews = async (path, options = {}) => {
  const { url, anonKey } = getSupabaseConfig()
  const response = await fetch(`${url}/rest/v1/reviews${path}`, {
    ...options,
    headers: {
      apikey: anonKey,
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Review service error (${response.status}): ${details || response.statusText}`)
  }

  return response
}

const isLegacyReview = (review) => (
  review &&
  typeof review.id === 'string' &&
  typeof review.name === 'string' &&
  typeof review.bikeName === 'string' &&
  Number.isInteger(review.rating) &&
  review.rating >= 1 &&
  review.rating <= 5 &&
  typeof review.comment === 'string' &&
  typeof review.createdAt === 'string'
)

const toDatabaseReview = ({ id, name, bikeName, rating, comment, createdAt }) => ({
  id,
  name,
  bike_name: bikeName,
  rating,
  comment,
  created_at: createdAt
})

const fromDatabaseReview = (review) => ({
  id: review.id,
  name: review.name,
  bikeName: review.bike_name,
  rating: review.rating,
  comment: review.comment,
  createdAt: review.created_at
})

export const migrateLocalReviews = async () => {
  const savedReviews = localStorage.getItem(LEGACY_REVIEWS_STORAGE_KEY)
  if (!savedReviews) return

  const reviews = JSON.parse(savedReviews)
  if (!Array.isArray(reviews)) {
    throw new Error('Previously saved reviews are not in a valid format.')
  }

  const validReviews = reviews.filter(isLegacyReview)
  if (!validReviews.length) return

  await requestReviews('?on_conflict=id', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify(validReviews.map(toDatabaseReview))
  })
}

export const loadReviews = async () => {
  const response = await requestReviews(
    `?select=${REVIEW_COLUMNS}&order=created_at.desc`
  )
  const reviews = await response.json()

  if (!Array.isArray(reviews)) {
    throw new Error('The review service returned data in an invalid format.')
  }

  return reviews.map(fromDatabaseReview)
}

export const saveReview = async (review) => {
  const response = await requestReviews('', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify([toDatabaseReview(review)])
  })
  const savedReviews = await response.json()

  if (!Array.isArray(savedReviews) || !savedReviews.length) {
    throw new Error('The review service did not confirm that the review was saved.')
  }

  return fromDatabaseReview(savedReviews[0])
}
