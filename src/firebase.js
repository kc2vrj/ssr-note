import admin from 'firebase-admin';
import serviceAccount from './path/to/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || 'your_database_url'
});

const db = admin.firestore();

// Create references to the 'techs' and 'sites' collections
const techsCollection = db.collection('techs');
const sitesCollection = db.collection('sites');

export { db, techsCollection, sitesCollection };
