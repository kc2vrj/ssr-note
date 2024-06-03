let getCollection;

if (typeof window === 'undefined') {
  const { MongoClient } = require('mongodb');
  const logger = require('./logger');

  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  let db;

  const connectDB = async () => {
    if (!db) {
      logger.info('Connecting to MongoDB...');
      await client.connect();
      logger.info('Connected to MongoDB');
      db = client.db('note-taking-app');
      logger.info('Database connected: note-taking-app');
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

  getCollection = async (collectionName) => {
    const database = await connectDB();
    return database.collection(collectionName);
  };
} else {
  getCollection = async () => {
    throw new Error('getCollection is not available in the browser');
  };
}

export { getCollection };
