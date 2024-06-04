import { connectToMongo, getCollection } from './mongoUtils.js';

connectToMongo()
  .then(() => {
    console.log('MongoDB connection established');
    // Start the Express server here
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });