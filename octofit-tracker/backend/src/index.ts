import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 8000
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker'

// Middleware
app.use(express.json())

// MongoDB Connection
mongoose.connect(MONGODB_URI, {
  retryWrites: true,
  w: 'majority',
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((err) => {
  console.error('MongoDB connection error:', err)
})

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker Backend API' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
