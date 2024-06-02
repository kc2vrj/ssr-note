const jest = require('jest-mock');
const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');
const { db, firebaseApp, techsCollection, sitesCollection } = require('./firebase');

jest.mock('firebase/compat/app', () => {
  const firestore = jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      add: jest.fn(),
      get: jest.fn(),
      onSnapshot: jest.fn(),
    })),
  }));

  return {
    initializeApp: jest.fn(),
    firestore,
    app: jest.fn(() => ({
      firestore,
    })),
  };
});

describe('Firebase configuration', () => {
  it('should initialize Firebase app', () => {
    expect(firebase.initializeApp).toHaveBeenCalled();
  });

  it('should create firestore instance', () => {
    expect(firebase.firestore).toHaveBeenCalled();
  });

  it('should export db, firebaseApp, techsCollection, and sitesCollection', () => {
    expect(db).toBeDefined();
    expect(firebaseApp).toBeDefined();
    expect(techsCollection).toBeDefined();
    expect(sitesCollection).toBeDefined();
  });
});
