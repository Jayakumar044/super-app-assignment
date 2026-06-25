# The Super App — Premium Personal Hub

> A full-featured, interview-ready personal platform built with React, Vite, and Tailwind CSS. Designed for modern web standards with a premium aesthetic.

![Platform](https://img.shields.io/badge/Platform-Web-violet?style=for-the-badge)
![Framework](https://img.shields.io/badge/Framework-React_+_Vite-blue?style=for-the-badge&logo=react)
![Styling](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8?style=for-the-badge&logo=tailwindcss)

---

## 🌐 About

**The Super App** is a curated, all-in-one personal intelligence platform where entertainment, productivity, and real-world data converge. It features a stunning, mobile-first interface with a professional **Slate & Violet** aesthetic. All user data is stored locally in the browser — no backend required.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 Secure Auth | Full register/login flow with password validation, route guards |
| 🎬 Entertainment | Cinematic movie browser powered by OMDB API, genre-based rows |
| 🌦️ Weather | Live weather with OpenWeatherMap, animated conditions |
| 📰 News | Live news feed with auto-rotating banners via NewsAPI |
| 📝 Notes | Real-time auto-save personal notes with character counter |
| ⏱️ Timer | Pomodoro-style focus timer with session tracking |
| 👤 Profile | User profile with stats and editable details |
| 🎯 Categories | Interest-based personalization (8 premium categories) |
| 📜 Legal | Full Terms of Service & Privacy Policy pages |

---


## 🛠️ Tech Stack

- **React 18** — Concurrent rendering, lazy loading, Suspense
- **Vite** — Next-gen bundler with lightning fast HMR
- **Tailwind CSS v3** — Utility-first styling with custom design tokens
- **Framer Motion** — Production-grade animations and transitions
- **Zustand** — Lightweight, persistent global state management
- **React Router v6** — Client-side routing with protected routes
- **Axios** — HTTP client for API integrations

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18.x
- npm ≥ 9.x

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd super-app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root with:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_NEWS_API_KEY=your_newsapi_key
```

> Get free API keys from:
> - [OMDB API](http://www.omdbapi.com/) — Movie data
> - [OpenWeatherMap](https://openweathermap.org/api) — Weather data
> - [NewsAPI](https://newsapi.org/) — News content

### Running Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## 📂 Project Structure

```
src/
├── assets/              # Logo, category images, media
├── components/
│   └── ui/              # Reusable UI atoms (Button, FloatingInput, etc.)
├── layouts/
│   └── Layout.jsx       # Floating header + mobile bottom navigation
├── pages/
│   ├── RegisterPage.jsx # Secure registration with password validation
│   ├── LoginPage.jsx    # Login with real credential matching
│   ├── CategoriesPage.jsx # Interest selection with premium visuals
│   ├── DashboardPage.jsx  # Main hub with all widgets
│   ├── EntertainmentPage.jsx # Cinematic movie browser
│   ├── ProfilePage.jsx  # User profile and statistics
│   ├── TermsPage.jsx    # Terms of Service
│   └── PrivacyPage.jsx  # Privacy Policy
├── routes/
│   └── ProtectedRoute.jsx # Auth-gated route wrappers
├── store/
│   └── useAppStore.js   # Zustand store with persist middleware
└── App.jsx              # Root router and route definitions
```

---

## 🔐 Authentication Flow

```
New User  →  /register  →  /login  →  /categories  →  /dashboard
Returning →  /login  →  /dashboard (categories & credentials preserved)
Guest     →  Any private route  →  Redirect to /login or /register
Logout    →  Clears session flag only (credentials preserved in localStorage)
Re-Login  →  Use same username/email & password — works every time ✓
```

> **Key Behaviour**: Registration data (name, username, email, password) is stored in `localStorage` and persists indefinitely. You can register once and log in as many times as you want — logout does not erase your account.

### Route Protection Rules

| Route | Guard | Redirects to |
|---|---|---|
| `/dashboard` | Must be logged in + 3+ categories | `/login` or `/categories` |
| `/entertainment` | Must be logged in + 3+ categories | `/login` or `/categories` |
| `/categories` | Must be logged in | `/login` |
| `/profile` | Must be logged in + 3+ categories | `/login` |
| `/terms`, `/privacy` | Public | — |

---


## 🎨 Design System

| Token | Value |
|---|---|
| Primary | Violet 600 (`#7c3aed`) |
| Secondary | Violet 500 |
| Background | Slate 50 |
| Text | Slate 900 |
| Muted | Slate 400 |
| Border | Slate 100/200 |

### Components
- **`card-premium`** — Elevated white card with soft border and shadow
- **`FloatingInput`** — Floating label + high-visibility border + error state
- **`Button`** — Primary CTA with loading and disabled states
- **`FloatingHeader`** — Glass-blur top nav with profile dropdown
- **`MobileBottomNav`** — App-like persistent bottom navigation

---

## 📱 Responsive Design

| Breakpoint | Layout |
|---|---|
| Mobile (<768px) | Single column, floating bottom nav |
| Tablet (768-1024px) | 2-column grid, adaptive header |
| Desktop (>1024px) | Full sidebar/header layout |

---

## 🏗️ Build for Production

```bash
npm run build
```

Output is in the `dist/` folder, ready for deployment on Vercel, Netlify, or any static host.

---

## ⚠️ Known Constraints

- Authentication is **client-side only** (localStorage) — no real backend.
- News API **does not support client-side CORS** in production; use a proxy or server-side fetch in production.
- OMDB Free tier limits to 1,000 requests/day.

---

## 👨‍💻 Author

Built with ❤️ for professional portfolio and interview demonstration purposes.

**Skyway Intelligence** — Where productivity meets premium design.

---

## 📄 License

MIT License — See [Terms of Service](/terms) and [Privacy Policy](/privacy) within the application.
