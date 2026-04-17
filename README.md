# Smart-Food-Redistribution-System-
A smart logistics system that matches food donors (restaurants, supermarkets, events) with NGOs and food banks using real-time availability tracking and route optimization.

[![HTML](https://img.shields.io/badge/Built%20With-HTML%2FCSS%2FJS-orange?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web)
[![Storage](https://img.shields.io/badge/Storage-localStorage-blue?style=flat-square)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Roles](#pages--roles)
- [Getting Started](#getting-started)
- [Demo Credentials](#demo-credentials)
- [How It Works](#how-it-works)
- [Database (localStorage)](#database-localstorage)
- [Contributing](#contributing)
- [License](#license)

---

## About

**FoodShare** is a browser-based Smart Food Redistribution System that bridges the gap between food surplus and food scarcity. Restaurants, hotels, and individuals can list surplus food which NGOs and communities can then request and collect — all managed through a clean, role-based web interface.

No backend server required. All data is stored and managed using the browser's `localStorage`, making it fully portable and deployable as static files anywhere.

---

## Features

### 🍽️ For Food Providers (Restaurants / Hotels)
- Add food donations with name, quantity, location, expiry time, and details
- View and manage all active donations from a personal dashboard
- See incoming food requests from NGOs/consumers
- Approve or reject requests directly from the dashboard

### 🤝 For Consumers / NGOs
- Browse all available food donations in real time
- Search food by name or location
- Request food with a single click
- Track request status — Pending, Approved, or Rejected
- Full request history with filterable tabs

### 🛡️ For Admins
- Full visibility over all users, donations, and requests (tabbed panel)
- Search and remove registered users
- Delete any food donation listing
- Approve or reject any pending request platform-wide
- Live stats: total users, donations, requests, and meals facilitated

### 🌐 Platform
- Animated landing page with live platform statistics
- Role-based authentication with page-level route protection
- Auto-seeded demo data on first launch
- Toast notifications for all key actions

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` |
| Icons | Font Awesome 6.4 |
| Typography | Playfair Display + DM Sans (Google Fonts) |
| Deployment | Any static host — GitHub Pages, Netlify, Vercel |

---

## Project Structure

```
foodshare/
├── index.html          # Landing page — hero, how-it-works, role cards, stats
├── login.html          # Login with role-based redirect & quick demo fill
├── register.html       # Registration with role selector (Provider / Consumer)
├── provider.html       # Provider dashboard — donations table + request management
├── food.html           # Standalone form to add a new food donation
├── dashboard.html      # Consumer dashboard — stats + available food table
├── view.html           # Card-grid browse view for all available food
├── my-requests.html    # Consumer request history with status filter tabs
├── admin.html          # Admin panel — tabbed: Users / Donations / Requests
└── db.js               # Shared localStorage database & session utility layer
```

---

## Pages & Roles

| Page | Role | Description |
|------|------|-------------|
| `index.html` | Public | Landing page with platform overview and animated stats |
| `login.html` | Public | Login form with role-based redirect after auth |
| `register.html` | Public | Create a Provider or Consumer/NGO account |
| `provider.html` | Provider | Manage donations and respond to incoming requests |
| `food.html` | Provider | Standalone add-food form (also accessible via modal in provider.html) |
| `dashboard.html` | Consumer | Overview stats + food table with one-click request |
| `view.html` | Consumer | Card-style browse page with search and request button |
| `my-requests.html` | Consumer | Request history filtered by All / Pending / Approved / Rejected |
| `admin.html` | Admin | Full control panel — manage all users, foods, and requests |

---

## Getting Started

No build step or server required. Just open in a browser.

### Option 1 — Open Directly

```bash
git clone https://github.com/your-username/foodshare.git
cd foodshare
open index.html        # macOS
# or
start index.html       # Windows
```

### Option 2 — Local Dev Server (recommended)

```bash
# Python
python -m http.server 3000

# Node.js
npx serve .

# Then open: http://localhost:3000
```

### Option 3 — Deploy as Static Site

Upload all files to **GitHub Pages**, **Netlify**, or **Vercel** — zero configuration needed.

---

## Demo Credentials

Pre-seeded automatically on first load. Available as one-click quick-fill buttons on the login page.

| Role | Email | Password |
|------|-------|----------|
| 🛡️ Admin | `admin@foodshare.com` | `admin123` |
| 🍽️ Food Provider | `raj@hotel.com` | `pass123` |
| 🤝 Consumer / NGO | `help@ngo.com` | `pass123` |
| 🤝 Consumer / NGO | `food@care.com` | `pass123` |

---

## How It Works

```
1. Provider registers and lists surplus food
         (name, quantity, location, expiry time)
                     │
                     ▼
2. Food appears on Consumer dashboard & browse page
                     │
                     ▼
3. Consumer / NGO sends a one-click food request
                     │
                     ▼
4. Provider receives the request → Approves or Rejects
                     │
                     ▼
5. Consumer sees updated status in My Requests
                     │
                     ▼
6. Admin monitors everything platform-wide in real time
```

---

## Database (localStorage)

All data is handled by `db.js` — a shared utility layer that wraps `localStorage` with clean, reusable methods.

| Key | Contents |
|-----|----------|
| `fs_users` | All registered user accounts |
| `fs_foods` | All food donation listings |
| `fs_requests` | All food requests from consumers |
| `fs_session` | Currently logged-in user (session) |
| `fs_seeded` | Flag to prevent demo data from re-seeding |

### Key API Methods

```javascript
DB.registerUser(name, email, password, role)    // Register a new user
DB.loginUser(email, password)                   // Login and return user object
DB.setSession(user) / DB.getSession()           // Read/write active session
DB.requireAuth(role)                            // Redirect if not authenticated
DB.addFood(foodObject)                          // Add a new food listing
DB.getAvailableFoods()                          // Fetch all status='available' items
DB.getFoodsByProvider(providerId)               // Get a specific provider's listings
DB.addRequest(requestObject)                    // Submit a new food request
DB.updateRequestStatus(reqId, status)           // Approve or reject a request
DB.deleteFood(foodId)                           // Remove a food listing
DB.getRequestsByConsumer(consumerId)            // Get all requests by a consumer
DB.getRequestsByProvider(providerId)            // Get all requests for a provider
```

> ⚠️ **Note:** `localStorage` is browser-local and not shared across devices or users. For a production deployment, replace `db.js` with a real backend API (e.g. Node.js + Express + MongoDB or Python + Flask + PostgreSQL).

---

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add: short description'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Ideas for Future Contributions

- Replace `localStorage` with a real REST API backend
- Add Google Maps integration for pickup location display
- Implement email or SMS notifications on request approval
- Auto-expire food listings past their expiry time
- Add a mobile app (React Native / Flutter)
- Add food category filters and dietary tags

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
  <br>
  Made with ❤️ to fight food waste and hunger<br>
  <strong>FoodShare</strong> — Smart Food Redistribution System © 2026
</div>
