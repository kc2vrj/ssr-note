import { MongoClient } from './mongodb';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('note-taking-app');
  }
  return db;
};

const getCollection = async (collectionName) => {
  const database = await connectDB();
  return database.collection(collectionName);
};

export { getCollection };
