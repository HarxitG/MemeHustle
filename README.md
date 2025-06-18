# 💀 MemeHustle Marketplace

A real-time meme marketplace built with React (Vite), Express, Supabase, and Gemini API. Users can upload memes, generate AI captions, vote, and view live updates.

---

## 🧠 Features

- 🚀 Real-time updates via Socket.IO
- 🎯 AI-generated captions with Gemini API
- 🔥 Leaderboard based on upvotes
- 🧑‍🎨 Meme uploads with tagging
- 📡 Fullstack setup: React (frontend) + Express (backend) + Supabase (DB)

---

## 📁 Project Structure

memehustle/
├── client/ # React frontend (Vite)
├── server/ # Express backend (API + Sockets)
└── README.md # You're here

---

## ⚙️ Technologies

- Frontend: React + Tailwind + Vite
- Backend: Express + Socket.IO
- Database: Supabase (PostgreSQL)
- AI: Gemini 1.5 Flash API

---

## 🚀 Local Development

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/memehustle.git
cd memehustle
```

2. Set up environment variables
   Create .env files in both /client and /server folders.

/client/.env (Vite)

```bash
VITE_BACKEND_URL=http://localhost:5000
```

/server/.env

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

3. Install and run frontend

```bash
   cd client
   npm install
   npm run dev
```

4. Install and run backend

```bash
cd ../server
npm install
node server.js
```

## Deployed on render
Live: https://memehustle-frontend.onrender.com
