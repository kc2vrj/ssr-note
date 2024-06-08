import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRouter from './apiRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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

// Connect to MongoDB (force IPv4)
// Remove this block, as it's already handled in mongoUtils.js

import { Tech, Site, Note } from './models.js';



app.use('/api', apiRouter);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
