# 🏍️ OwnRide — Premium 2-Wheeler Bike Rental

A sleek, modern bike rental website built with React, featuring smooth animations and real Razorpay payment integration.

### 🌐 Live Website

**🔗 [https://bike-rental-kappa-nine.vercel.app](https://bike-rental-kappa-nine.vercel.app)**

---

## ✨ Features

- **Realistic Bike Catalog** — 6 premium motorcycles with real photos and specs
- **City Selector** — Choose from Patiala, Rajpura, Chandigarh with availability info
- **Dark / Light Mode** — Toggle between themes, persists in localStorage
- **Smooth Animations** — Framer Motion powered scroll reveals, hover effects, page transitions
- **Razorpay Payments** — Real checkout gateway with UPI support (GPay, PhonePe, Paytm)
- **Post-booking Reviews** — Riders can rate and review completed bookings; reviews are shared across visitors through Supabase
- **Responsive Design** — Works perfectly on mobile, tablet, and desktop
- **3-Step Booking Flow** — Details → Schedule → Payment with animated steps

## 🏍️ Available Bikes

| Bike | Category | Power | Mileage |
|------|----------|-------|---------|
| Royal Enfield Classic 350 | Cruiser | 20.2 HP | 41 kmpl |
| KTM Duke 390 | Naked | 43 HP | 35 kmpl |
| Yamaha MT-15 | Street | 18.4 HP | 55 kmpl |
| Harley Davidson Iron 883 | Cruiser | 50 HP | 25 kmpl |
| TVS Apache RTR 310 | Sport | 33.5 HP | 38 kmpl |
| Ducati Monster 821 | Naked | 112 HP | 19 kmpl |

## 🛠️ Tech Stack

- **React 19** + **Vite** — Fast development and build
- **Framer Motion** — Advanced animations
- **React Router** — Client-side routing
- **Razorpay Checkout.js** — Payment gateway with UPI
- **Unsplash** — Real motorcycle photography

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/karthikverma29b-dot/ownride-bike-rental.git

# Navigate to project
cd ownride-bike-rental

# Install dependencies
npm install

# Start development server
npm run dev
```

## 💳 Razorpay Setup

1. Sign up at [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Get your test API key
3. Replace `rzp_test_1234567890` in `src/pages/BookingPage.jsx` with your key
4. All bike rents are set to **₹1** for demo purposes

## ⭐ Shared Reviews Setup

Reviews are stored in Supabase so they are visible to visitors using different browser accounts.

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run the SQL in `supabase/schema.sql` using the Supabase SQL Editor.
3. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project API settings. Use only the publishable/anon key in frontend configuration; never put a service-role key in the app.
4. Restart the Vite dev server. For Vercel, add the same two environment variables in the project settings and redeploy.

Previously saved browser-local reviews are imported into Supabase when the Reviews section next loads. The table allows public reading and submissions, but not public updates or deletes.
5. To try reviews without completing a payment, choose **Continue with demo booking (no payment)** on the payment step. This does not charge a card.

## 📦 Build for Production

```bash
npm run build
```

## 📄 License

Built with ❤️ by Karthik Verma
