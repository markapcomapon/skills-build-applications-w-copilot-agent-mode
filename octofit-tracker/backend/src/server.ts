import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

// Get the Codespace name for CORS configuration
const CODESPACE_NAME = process.env.CODESPACE_NAME || 'localhost';
const allowedOrigin = `https://${CODESPACE_NAME}-5173.app.github.dev`;

// Middleware
app.use(cors({
  origin: CODESPACE_NAME === 'localhost' ? 'http://localhost:5173' : allowedOrigin,
  credentials: true
}));
app.use(express.json());

// API Routes
app.get('/api/activities/', (req, res) => {
  res.json({ activities: [] });
});

app.get('/api/leaderboard/', (req, res) => {
  res.json({ leaderboard: [] });
});

app.get('/api/teams/', (req, res) => {
  res.json({ teams: [] });
});

app.get('/api/users/', (req, res) => {
  res.json({ users: [] });
});

app.get('/api/workouts/', (req, res) => {
  res.json({ workouts: [] });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  const serverUrl = CODESPACE_NAME === 'localhost' 
    ? `http://localhost:${PORT}`
    : `https://${CODESPACE_NAME}-${PORT}.app.github.dev`;
  console.log(`Server running at ${serverUrl}`);
});

export default app;
