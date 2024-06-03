import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db('note-taking-app');
    // Ensure the collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    const requiredCollections = ['techs', 'sites', 'notes'];
    for (const collection of requiredCollections) {
      if (!collectionNames.includes(collection)) {
        await db.createCollection(collection);
      }
    }
  }
  return db;
};

const getCollection = async (collectionName) => {
  const database = await connectDB();
  return database.collection(collectionName);
};

export { getCollection };
