// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// last
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import rentRoutes from './routes/rentRoutes.js';

dotenv.config();       // Load env variables
connectDB();           // Connect to MongoDB

const app = express();
app.use(express.json());

// last
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); // Authentication routes
app.use('/api/books', bookRoutes);
app.use('/api/rents', rentRoutes); // Rent routes


// Sample route
app.get('/', (req, res) => {
  res.send('Book Buddy API crud is running...')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




