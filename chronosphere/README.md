# ChronoSphere

Futuristic historical time-travel atlas prototype.

## Stack
- Next.js + React + TypeScript + TailwindCSS + Framer Motion + Leaflet + D3 interpolation
- Node.js + Express + Socket.IO
- PostgreSQL/PostGIS schema via Prisma

## Run

### Backend
```bash
cd chronosphere/backend
npm install
npm run dev
```

### Frontend
```bash
cd chronosphere/frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev
```

## Current MVP
- Interactive map centered on historical borders endpoint
- Timeline slider from 2026 to 3000 BCE
- Dynamic country card (name, population, area, government, year)
- Realtime chat rooms support (socket channels)
- Database schema for borders, populations, empires, timeline events, and chat
