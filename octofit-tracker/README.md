# OctoFit Tracker

A modern multi-tier fitness tracking application built with GitHub Copilot agent mode.

## Architecture

- **Frontend**: React 19 with Vite (Port 5173)
- **Backend**: Node.js + Express + TypeScript (Port 8000)
- **Database**: MongoDB (Port 27017)

## Setup

### Frontend Setup
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd octofit-tracker/backend
npm install
npm run dev
```

### Database Setup
Ensure MongoDB is running on port 27017:
```bash
mongod --port 27017
```

## Services

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- MongoDB: mongodb://localhost:27017
