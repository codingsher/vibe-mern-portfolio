import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import mongoose from 'mongoose';

// Import routes
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(limiter);

// Set up routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Portfolio API' });
});

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Running in offline mode without database connection');
    return false;
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const dbConnected = await connectDB();
  
  // Add a special route to serve placeholder data when MongoDB is unavailable
  if (!dbConnected) {
    app.get('/api/projects', (req, res) => {
      const placeholderProjects = [
        {
          _id: '1',
          title: 'Auto Mail Reply',
          description: 'A Python program that fetches unread emails from Google Account and uses integrated LLAMA3 AI model to generate suitable responses. Features automatic email processing for student paper rechecking requests.',
          technologies: ['Python', 'LLAMA3 AI', 'Gmail API', 'SMTP', 'IMAP'],
          imageUrl: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
          demoUrl: 'https://github.com/codingsher/Auto_Mail_Reply',
          repoUrl: 'https://github.com/codingsher/Auto_Mail_Reply',
          featured: true,
          order: 1
        },
        {
          _id: '2',
          title: 'Car Rental System',
          description: 'A C++ console application for car rental management that I built when I started my programming journey. Features basic rental operations and file-based data storage.',
          technologies: ['C++', 'Console Application', 'File Handling', 'OOP'],
          imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1276&q=80',
          demoUrl: 'https://github.com/codingsher/car_rental_system',
          repoUrl: 'https://github.com/codingsher/car_rental_system',
          featured: true,
          order: 2
        },
        {
          _id: '3',
          title: 'CalDAV Calendar',
          description: 'A Python-based calendar application that implements the CalDAV protocol (RFC4791) for synchronizing calendars across devices. Features include creating and modifying calendars, managing events, and searching events by date ranges.',
          technologies: ['Python', 'CalDAV Protocol', 'RESTful APIs', 'iCalendar', 'Web Services'],
          imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80',
          demoUrl: 'https://github.com/codingsher/CalDAV_Calendar',
          repoUrl: 'https://github.com/codingsher/CalDAV_Calendar',
          featured: true,
          order: 3
        }
      ];
      
      res.json(placeholderProjects);
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer(); 