import mongoose from 'mongoose';

export const connectToMongo = async () => {
  try {
    // MongoDB connection URI
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/notetakingapp';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

export const getCollection = async (collectionName) => {
  const db = await mongoose.connection.db;
  const collection = db.collection(collectionName);
  return collection;
};
