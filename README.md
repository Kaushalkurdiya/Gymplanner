# 🏋️ AI Gym Planner

An AI-powered gym planner that generates personalized workout plans based on your goals, experience level and schedule. Built with React, TypeScript and an Express + PostgreSQL backend.

**🔗 Live demo:** https://gymplanner-1.onrender.com

<!-- Add 2-3 screenshots here, e.g. ![Dashboard](./public/screenshots/dashboard.png) -->

## ✨ Features

- **AI-generated workout plans** using the OpenAI API, tailored to the user's goal, level and available days
- **Secure authentication** with Neon Auth (sign up, sign in, protected routes)
- **Saved plans** stored in PostgreSQL via Prisma
- **Responsive UI** built with Tailwind CSS
- **Client-side routing** with React Router

<!-- Edit this list to match exactly what your app does (e.g. progress tracking, exercise library, plan history) -->

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Lucide Icons |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (Neon), Prisma ORM |
| Auth | Neon Auth |
| AI | OpenAI API |
| Deployment | Render |

## 📁 Project Structure

```
Gymplanner/
├── public/          # Static assets
├── src/             # React + TypeScript frontend
├── server/          # Express backend (API, Prisma, OpenAI integration)
├── index.html
├── vite.config.ts
└── package.json
```

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))
- A Neon Auth project
- An OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/Kaushalkurdiya/Gymplanner.git
cd Gymplanner
```

### 2. Set up the frontend

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_NEON_AUTH_URL=your_neon_auth_url
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

### 3. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

Run Prisma migrations and start the server:

```bash
npx prisma migrate dev
npm run dev
```

<!-- Check the variable names and scripts above against your server/package.json and server/.env -->

## 🚀 Deployment

- **Frontend:** deployed as a Render static site. Add a rewrite rule `/*` → `/index.html` so client-side routes (like `/auth/sign-in`) don't return "Not Found".
- **Backend:** deploy `server/` as a Render web service and set the environment variables above.

## 🔄 How It Works

1. The user signs up or signs in through Neon Auth.
2. They enter their fitness goal, experience level and weekly availability.
3. The frontend sends this to the Express API.
4. The server prompts OpenAI to generate a structured workout plan.
5. The plan is saved to PostgreSQL through Prisma and shown in the UI.

## 🗺️ Future Improvements

- Progress and workout logging
- Exercise demo videos or images
- Plan editing and regeneration
- Dockerized setup

## 👤 Author

**Kaushal Kurdiya** — [GitHub](https://github.com/Kaushalkurdiya)
