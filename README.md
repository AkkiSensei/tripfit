# TripFit — Travel Style Matcher & Destination Recommendation System

> **Stop guessing. Start exploring.** TripFit is a dynamic travel recommendation web application that helps users discover destinations tailored to their personal travel style through an interactive personality quiz.

![TripFit Logo](logo/TripFit_logo2-removebg-preview.png)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Authentication** | Login, sign-up, forgot password, and 6-digit OTP email verification (client-side demo mode) |
| **Travel Quiz** | 6-step questionnaire covering climate, trip style, budget, companions, activities, and duration |
| **Smart Recommendations** | Scoring algorithm matches quiz answers against 20 destinations; shows top 3 with match % |
| **Destination Catalog** | Browse all 20 destinations with search and filter by region, climate, trip type, and budget |
| **Destination Detail** | Per-destination page with 3-day itinerary, local tips, region, and activities |
| **Favorites** | Save and manage favorite destinations (localStorage-persisted) |
| **Community Reviews** | Read, filter, and submit destination reviews with star ratings and helpful votes |
| **Booking Flow** | 5-step booking wizard — destination, trip plan, cost estimate, payment selection, confirmation |
| **Quiz History** | Review past recommendation snapshots from previous quiz sessions |
| **Booking History** | View all past bookings with reference numbers, totals, and dates on the profile page |
| **Dark Mode** | System-wide dark/light toggle, persisted across pages |
| **Responsive Design** | Works on mobile, tablet, and desktop |

---

## 🏗 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | Tailwind CSS (CDN), Vanilla CSS |
| Logic | Vanilla JavaScript (ES6+), DOM manipulation |
| Storage | Browser `localStorage` |
| Icons | Font Awesome 6.5 |
| Fonts | Google Fonts — Inter |

> **No backend, no database, no build step.** All data is stored in `localStorage`. Authentication is simulated client-side for demonstration purposes.

---

## 📁 Project Structure

```
tripfit/
├── index.html              Login gateway (entry point)
├── signup.html             User registration
├── verify.html             6-digit OTP verification (signup & password reset)
├── reset-password.html     New password entry after OTP reset
├── home.html               Landing page with featured destinations
├── quiz.html               6-step travel personality quiz
├── recommendation.html     Personalised top-3 destination matches
├── all-destinations.html   Full catalog with search and filter
├── destination.html        Dynamic destination detail page
├── favorites.html          Saved favorites management
├── reviews.html            Community reviews — read and submit
├── book.html               5-step booking wizard
├── history.html            Quiz recommendation history
├── profile.html            User profile and booking history
│
├── script.js               Destination database, scoring algorithm, card rendering
├── navbar.js               Global navigation component
├── itinerary-modal.js      Itinerary modal and destination detail rendering
│
├── style.css               Global base styles
├── itinerary-modal.css     Modal-specific styles
│
├── images/                 Destination images (lowercase-hyphenated filenames)
├── images1/                Additional destination images
├── logo/                   TripFit brand assets
│
├── netlify.toml            Netlify deployment configuration (optional)
└── .gitattributes          Line-ending normalization for cross-platform commits
```

---

## 🚀 Running Locally

TripFit is a pure static site — no build step, no server required.

**Option 1: Direct open**
```bash
# Clone the repository
git clone https://github.com/AkkiSensei/tripfit.git
cd TripFit

# Open index.html in your browser
# On Windows:
start index.html
# On Mac:
open index.html
```

**Option 2: Local dev server (recommended — avoids CORS quirks)**
```bash
# Using Python (built-in)
python -m http.server 3000
# Then open http://localhost:3000

# Using Node.js (npx)
npx serve .
# Then open http://localhost:3000

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## ☁️ Deploying to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Push your repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository (`TripFit`)
4. Configure the project:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (leave blank)
   - **Build Command:** *(leave empty — no build required)*
   - **Output Directory:** `./` (or leave blank)
5. Click **Deploy**

Vercel will automatically serve all static HTML pages, CSS, JavaScript, and assets directly from the repository root.

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from the project directory
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Which scope: (your account)
# - Link to existing project: N
# - Project name: tripfit
# - Directory: ./
# - Build command: (leave empty)
# - Output directory: ./

# For production deployment
vercel --prod
```

### Multipage Static Architecture Notes

TripFit is a multi-page static site. Individual pages (`index.html`, `quiz.html`, `recommendation.html`, `book.html`, etc.) and asset directories (`images/`, `images1/`, `logo/`) are served directly as standard static files with no serverless functions, builds, or SPA rewrites required.

---

## 🔒 Architecture & Limitations

> This is a client-side demo application. The following features are simulated and require backend infrastructure for production use:

| Feature | Demo Implementation | Production Requirement |
|---|---|---|
| **Authentication** | Passwords stored in `localStorage` (plaintext) | Backend auth (JWT, sessions) + hashed passwords |
| **OTP Verification** | Code generated in browser, shown on screen | Email API (Resend, SendGrid, AWS SES) |
| **Payment** | Form validation only, no gateway | Razorpay / Stripe integration |
| **Reviews** | Stored in `localStorage` | Database (Firestore, Supabase, PostgreSQL) |
| **Bookings** | Stored in `localStorage` | Backend booking service |

---

## 🌍 Destination Database

20 curated global destinations across 6 regions:

| Region | Destinations |
|---|---|
| **Asia** | Bali · Tokyo · Bangkok · Lyari Town · Taj Mahal |
| **Europe** | Swiss Alps · Paris · Santorini · Reykjavik |
| **North America** | New York City · Grand Canyon · Vancouver |
| **South America** | Rio de Janeiro · Machu Picchu · Galápagos Islands |
| **Africa** | Cape Town · Serengeti · Marrakech |
| **Oceania** | Sydney · Great Barrier Reef · Queenstown |

---

## 📝 License

This project was built as part of a Software Engineering course (Experiments 1–7). For educational use.
