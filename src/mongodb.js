// MongoDB Connection Logic
const MongoClient = require('mongodb').MongoClient;

let getCollection;

if (typeof window === 'undefined') {
  const { MongoClient } = require('mongodb');

  // MongoDB connection URI
  const uri = 'mongodb://127.0.0.1:27017/note-app';

  // Create a new MongoClient instance
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Connect to the MongoDB cluster
  const connectDB = async () => {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error(err);
    }
  };

  // Get the database instance
  let db;

  // Connect to MongoDB and get the database instance
  connectDB().then(() => {
    db = client.db('note-app'); // Replace with your database name
  });

  // Function to get a collection
  getCollection = async (collectionName) => {
    if (!db) {
      throw new Error('Database not connected');
    }
    const collection = db.collection(collectionName);
    return collection;
  };
} else {
  getCollection = async (collectionName) => {
    throw new Error('getCollection is not available in the browser');
  };
}

// Export the getCollection function
module.exports = { getCollection };
