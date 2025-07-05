// server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import rentRoutes from './routes/rentRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();       // Load env variables
connectDB();           // Connect to MongoDB

const app = express();
app.use(express.json());

// Middleware connect backend
app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true                // allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json()); 

// last
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); // Authentication routes
app.use('/api/books', bookRoutes);
app.use('/api/rents', rentRoutes); // Rent routes
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/Uploads', express.static('Uploads')); // Serve static files from uploads directory


// Sample route
app.get('/', (req, res) => {
  res.send('Book Buddy API crud is running...')
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));




