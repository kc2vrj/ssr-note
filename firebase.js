const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: 'your-api-key-from-secure.env',
  authDomain: 'your-auth-domain-from-secure.env',
  databaseURL: 'your-database-url-from-secure.env',
  projectId: 'your-project-id-from-secure.env',
  storageBucket: 'your-storage-bucket-from-secure.env',
  messagingSenderId: 'your-messaging-sender-id-from-secure.env',
  appId: 'your-app-id-from-secure.env',
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
