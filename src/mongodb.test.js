const { MongoClient } = require('mongodb');
const { getCollection } = require('./mongodb');

jest.mock('mongodb', () => {
  const mCollection = {
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([]),
  };
  const mDb = {
    collection: jest.fn(() => mCollection),
    listCollections: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([]),
    createCollection: jest.fn(),
  };
  const mClient = {
    connect: jest.fn(),
    db: jest.fn(() => mDb),
  };
  return { MongoClient: jest.fn(() => mClient) };
});

describe('MongoDB configuration', () => {
  it('should connect to MongoDB and get collection', async () => {
    const collection = await getCollection('testCollection');
    expect(MongoClient).toHaveBeenCalled();
    expect(collection.find).toHaveBeenCalled();
  });

  it('should ensure required collections exist', async () => {
    await getCollection('testCollection');
    const client = MongoClient.mock.instances[0];
    const db = client.db();
    expect(db.listCollections).toHaveBeenCalled();
    expect(db.createCollection).not.toHaveBeenCalled();
  });
});
