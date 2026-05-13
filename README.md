# AI Travel Planner

A production-ready full-stack travel planner built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI components, Express.js, MongoDB/Mongoose, React Hook Form, Zod, and Axios.

## Features

- AI itinerary generation with budget, trip style, dates, and traveler preferences
- AI destination recommendations with confidence scores and best-fit reasons
- Role-based dashboard for travelers, agencies, and admins
- Explore destinations page with filters and curated destination cards
- Responsive SaaS-style interface with dark and light mode
- Express API with MongoDB-ready Mongoose models and local fallback data

## Quick Start

```bash
npm.cmd install
npm.cmd run dev
```

Client: `http://localhost:3000`

API: `http://localhost:5000`

## Environment

Create `server/.env` from `server/.env.example`:

```bash
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/ai-travel-planner
OPENAI_API_KEY=
```

Create `client/.env.local` from `client/.env.example`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If `OPENAI_API_KEY` or `MONGODB_URI` are not set, the app still runs with high-quality local fallback itinerary and destination data for development.
