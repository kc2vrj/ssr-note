const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'your_api_key',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'your_auth_domain',
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || 'your_database_url',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'your_project_id',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'your_storage_bucket',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'your_messaging_sender_id',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || 'your_app_id',
};

Object.keys(firebaseConfig).forEach(key => {
  if (!firebaseConfig[key]) {
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
