// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './apiRouter.js';
import { connectToMongo } from './mongoUtils.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.DATABASE === 'mongo') {
  connectToMongo(); // Connect to MongoDB
  console.log('Using MongoDB');
} else if (process.env.DATABASE === 'firebase') {
  console.log('Using Firebase');
} else {
  console.error('Invalid DATABASE value. Set it to either "mongo" or "firebase".');
  process.exit(1);
}

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
});

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: [
    'http://100.106.210.42:3000',
    'https://strat.kc2vrj.com',
    'http://localhost:3000'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});