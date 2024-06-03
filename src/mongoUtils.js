const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Create a new MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB cluster
export async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

// Get the database instance
let db;

// Connect to MongoDB and get the database instance
connectToMongo().then(() => {
  db = client.db('your-database-name'); // Replace with your database name
});

// Function to get a collection
export const getCollection = async (collectionName) => {
  if (!db) {
    throw new Error('Database not connected');
  }
  const collection = db.collection(collectionName);
  return collection;
};
