// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config(); // ✅ Must be at the very top

// Imports
import express from 'express';
import cors from 'cors';
import moviesRouter from './api/movies/index.js';
import usersRouter from './api/users/index.js';
import './db/index.js'; // This now has access to env variables

// Error handler
const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack}`);
};

// Create app
const app = express();

// Check that PORT is loaded correctly
const port = process.env.PORT;
console.log('PORT is:', port);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);


// Error handler middleware
app.use(errHandler);

// Start server
app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});