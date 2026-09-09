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

## 📦 Build for Production

```bash
npm run build
```

## 📄 License

Built with ❤️ by Karthik Verma
