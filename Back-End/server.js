// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// last
import authRoutes from './routes/authRoutes.js';



dotenv.config();       // Load env variables
connectDB();           // Connect to MongoDB

const app = express();
app.use(express.json());

// last
app.use('/api/auth', authRoutes);  // Authentication routes



// Sample route
app.get('/', (req, res) => {
  res.send('Book Buddy API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




