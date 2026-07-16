import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 8000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker'

// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }
  return `http://localhost:${PORT}`
}

const API_BASE_URL = getApiBaseUrl()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    ...(process.env.CODESPACE_NAME ? [`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`] : [])
  ],
  credentials: true
}))

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker Backend API',
    status: 'running',
    apiBaseUrl: API_BASE_URL,
    environment: process.env.CODESPACE_NAME ? 'codespaces' : 'localhost',
    timestamp: new Date().toISOString()
  })
})

// Mock Users API endpoint
app.get('/api/users', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Users endpoint',
    data: [
      {
        id: '1',
        username: 'user1',
        email: 'user1@example.com',
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        id: '2',
        username: 'user2',
        email: 'user2@example.com',
        firstName: 'Jane',
        lastName: 'Smith'
      }
    ]
  })
})

// Mock Activities API endpoint
app.get('/api/activities', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Activities endpoint',
    data: [
      {
        id: '1',
        userId: '1',
        name: 'Morning Run',
        type: 'cardio',
        duration: 30,
        caloriesBurned: 300,
        date: new Date().toISOString()
      },
      {
        id: '2',
        userId: '1',
        name: 'Weight Training',
        type: 'strength',
        duration: 45,
        caloriesBurned: 250,
        date: new Date().toISOString()
      }
    ]
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   OctoFit Tracker Backend Server Running   ║
╠════════════════════════════════════════════╣
║ API Base URL: ${API_BASE_URL.padEnd(41)}║
║ Port: ${String(PORT).padEnd(40)}║
║ Environment: ${(process.env.CODESPACE_NAME ? 'Codespaces' : 'localhost').padEnd(33)}║
╠════════════════════════════════════════════╣
║ Test Endpoints:                            ║
║ GET  ${`${API_BASE_URL}/`.padEnd(46)}║
║ GET  ${`${API_BASE_URL}/api/users`.padEnd(46)}║
║ GET  ${`${API_BASE_URL}/api/activities`.padEnd(46)}║
╚════════════════════════════════════════════╝
  `)
})
