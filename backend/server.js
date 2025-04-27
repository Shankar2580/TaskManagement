require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Add this line
const connectDB = require('./config/db');
const healthCheckRoutes = require('./routes/healthCheck');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/health', healthCheckRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      error: 'Server error',
      message: err.message 
    });
  });
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));