const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'undefined',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'undefined',
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'undefined',
  projectId: process.env.FIREBASE_PROJECT_ID || 'undefined',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'undefined',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'undefined',
  appId: process.env.FIREBASE_APP_ID || 'undefined',
};

Object.keys(firebaseConfig).forEach(key => {
  if (firebaseConfig[key] === 'undefined') {
    console.warn(`Environment variable ${key} is not defined`);
  }
});

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseApp = firebase.app();

// Create references to the 'techs' and 'sites' collections
const techsCollection = db.collection('techs');
const sitesCollection = db.collection('sites');

module.exports = { db, firebaseApp, techsCollection, sitesCollection };
